import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentAttendanceRow from '../components/StudentAttendanceRow';
import type { AttendanceStatus } from '../components/StudentAttendanceRow';
import './TakeAttendancePage.css';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
}

interface AcademicPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface Class {
  id: number;
  name: string;
  year: number;
  students: Student[];
}

interface AttendanceRecord {
  studentId: number;
  status: AttendanceStatus | null;
  notes: string;
  attendanceId?: number; // ID del registro existente para poder actualizarlo
}

interface ExistingAttendance {
  id: number;
  student: {
    id: number;
  };
  status: AttendanceStatus;
  notes: string;
  date: string;
}

const TakeAttendancePage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const [activePeriod, setActivePeriod] = useState<AcademicPeriod | null>(null);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState<Map<number, AttendanceRecord>>(
    new Map()
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isViewingExisting, setIsViewingExisting] = useState(false); // Nuevo estado

  useEffect(() => {
    fetchData();
  }, [classId]);

  useEffect(() => {
    if (activePeriod && attendanceDate && classData) {
      loadAttendanceForDate();
    }
  }, [attendanceDate, activePeriod, classData]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar datos de la clase
      const classResponse = await fetch(`http://localhost:3000/classes/${classId}`);
      if (!classResponse.ok) throw new Error('Error al cargar la clase');
      const classData = await classResponse.json();
      setClassData(classData);

      // Cargar período activo
      const periodResponse = await fetch(
        `http://localhost:3000/academic-periods/class/${classId}/active`
      );
      if (periodResponse.ok) {
        const periodData = await periodResponse.json();
        setActivePeriod(periodData);
      } else {
        setError('No hay un período académico activo. Por favor, activa un período primero.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendanceForDate = async () => {
    if (!activePeriod || !classId || !classData) return;

    try {
      // Intentar cargar asistencia existente para esta fecha
      const response = await fetch(
        `http://localhost:3000/attendance/class/${classId}?academicPeriodId=${activePeriod.id}&date=${attendanceDate}`
      );
      
      if (response.ok) {
        const existingAttendances: ExistingAttendance[] = await response.json();
        
        if (existingAttendances.length > 0) {
          // Hay asistencia registrada para esta fecha
          setIsViewingExisting(true);
          
          // Crear mapa con los datos existentes
          const records = new Map<number, AttendanceRecord>();
          
          // Primero inicializar todos los estudiantes
          classData.students.forEach((student: Student) => {
            records.set(student.id, {
              studentId: student.id,
              status: null,
              notes: '',
            });
          });
          
          // Luego llenar con los datos existentes
          existingAttendances.forEach((attendance) => {
            records.set(attendance.student.id, {
              studentId: attendance.student.id,
              status: attendance.status,
              notes: attendance.notes || '',
              attendanceId: attendance.id,
            });
          });
          
          setAttendanceRecords(records);
        } else {
          // No hay asistencia, inicializar en blanco
          resetAttendanceRecords();
          setIsViewingExisting(false);
        }
      } else {
        // Error al cargar, inicializar en blanco
        resetAttendanceRecords();
        setIsViewingExisting(false);
      }
    } catch (err) {
      console.error('Error loading attendance for date:', err);
      resetAttendanceRecords();
      setIsViewingExisting(false);
    }
  };

  const resetAttendanceRecords = () => {
    if (!classData) return;
    
    const records = new Map<number, AttendanceRecord>();
    classData.students.forEach((student: Student) => {
      records.set(student.id, {
        studentId: student.id,
        status: null,
        notes: '',
      });
    });
    setAttendanceRecords(records);
  };

  const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
    setAttendanceRecords((prev) => {
      const newRecords = new Map(prev);
      const record = newRecords.get(studentId);
      if (record) {
        record.status = status;
        newRecords.set(studentId, record);
      }
      return newRecords;
    });
  };

  const handleNotesChange = (studentId: number, notes: string) => {
    setAttendanceRecords((prev) => {
      const newRecords = new Map(prev);
      const record = newRecords.get(studentId);
      if (record) {
        record.notes = notes;
        newRecords.set(studentId, record);
      }
      return newRecords;
    });
  };

  const handleMarkAllPresent = () => {
    setAttendanceRecords((prev) => {
      const newRecords = new Map(prev);
      filteredStudents.forEach((student) => {
        const record = newRecords.get(student.id);
        if (record) {
          record.status = 'present';
          newRecords.set(student.id, record);
        }
      });
      return newRecords;
    });
  };

  const handleSaveAttendance = async () => {
    if (!activePeriod || !classData) return;

    // Validar que todos los estudiantes tengan un estado
    const allHaveStatus = Array.from(attendanceRecords.values()).every(
      (record) => record.status !== null
    );

    if (!allHaveStatus) {
      alert('⚠️ Por favor, marca la asistencia de todos los estudiantes antes de guardar.');
      return;
    }

    // Si estamos editando asistencia existente, preguntar confirmación
    if (isViewingExisting) {
      const confirmUpdate = window.confirm(
        '⚠️ Ya existe asistencia registrada para esta fecha.\n\n¿Deseas actualizar los registros existentes?'
      );
      if (!confirmUpdate) return;
    }

    try {
      setSaving(true);

      const attendanceData = Array.from(attendanceRecords.values()).map((record) => ({
        studentId: record.studentId,
        status: record.status!,
        notes: record.notes || undefined,
      }));

      const response = await fetch('http://localhost:3000/attendance/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classId: parseInt(classId || '0'),
          academicPeriodId: activePeriod.id,
          date: attendanceDate,
          attendances: attendanceData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar la asistencia');
      }

      const message = isViewingExisting 
        ? '✅ Asistencia actualizada exitosamente' 
        : '✅ Asistencia guardada exitosamente';
      alert(message);
      navigate(`/class/${classId}`);
    } catch (err) {
      alert(`❌ Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = Array.from(attendanceRecords.values()).some(
      (record) => record.status !== null || record.notes !== ''
    );

    if (hasChanges) {
      const confirm = window.confirm(
        '¿Estás seguro de que deseas cancelar? Se perderán todos los cambios no guardados.'
      );
      if (!confirm) return;
    }

    navigate(`/class/${classId}`);
  };

  const filteredStudents =
    classData?.students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const dni = student.dni.toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || dni.includes(search);
    }) || [];

  const getAttendanceSummary = () => {
    const summary = {
      present: 0,
      absent: 0,
      late: 0,
      justified: 0,
      pending: 0,
    };

    attendanceRecords.forEach((record) => {
      if (record.status) {
        summary[record.status]++;
      } else {
        summary.pending++;
      }
    });

    return summary;
  };

  const summary = getAttendanceSummary();

  if (loading) {
    return (
      <div className="take-attendance-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !classData || !activePeriod) {
    return (
      <div className="take-attendance-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>No se puede tomar asistencia</h2>
          <p>{error || 'No se pudo cargar la información necesaria'}</p>
          <button onClick={() => navigate(`/classes/${classId}`)} className="back-button-error">
            ← Volver a la clase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="take-attendance-page">
      <div className="attendance-header">
        <button onClick={handleCancel} className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver
        </button>

        <div className="attendance-title-section">
          <h1>{classData.name} - {new Date(attendanceDate + 'T00:00:00').toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}</h1>
          <div className="attendance-meta">
            <span className="meta-badge period">
              📅 {activePeriod.name}
            </span>
            <span className="meta-badge date">
              👥 {classData.students.length} estudiantes
            </span>
          </div>
        </div>
      </div>

      <div className="attendance-controls">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar estudiante por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        <div className="control-buttons">
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="date-picker"
          />
          <button onClick={handleMarkAllPresent} className="mark-all-button">
            ✓ Marcar todos presente
          </button>
        </div>
      </div>

      {isViewingExisting && (
        <div className="existing-attendance-banner">
          <div className="banner-icon">ℹ️</div>
          <div className="banner-content">
            <strong>Visualizando asistencia existente</strong>
            <p>Estás viendo la asistencia ya registrada para esta fecha. Puedes modificar los registros y guardar los cambios.</p>
          </div>
        </div>
      )}

      <div className="attendance-summary">
        <div className="summary-item present">
          <span className="summary-icon">✓</span>
          <span className="summary-label">Presentes</span>
          <span className="summary-count">{summary.present}</span>
        </div>
        <div className="summary-item absent">
          <span className="summary-icon">✗</span>
          <span className="summary-label">Ausentes</span>
          <span className="summary-count">{summary.absent}</span>
        </div>
        <div className="summary-item late">
          <span className="summary-icon">⏰</span>
          <span className="summary-label">Tardes</span>
          <span className="summary-count">{summary.late}</span>
        </div>
        <div className="summary-item justified">
          <span className="summary-icon">📝</span>
          <span className="summary-label">Justificados</span>
          <span className="summary-count">{summary.justified}</span>
        </div>
        <div className="summary-item pending">
          <span className="summary-icon">⋯</span>
          <span className="summary-label">Pendientes</span>
          <span className="summary-count">{summary.pending}</span>
        </div>
      </div>

      <div className="students-list">
        {filteredStudents.length === 0 ? (
          <div className="no-students">
            <p>No se encontraron estudiantes con "{searchTerm}"</p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const record = attendanceRecords.get(student.id);
            return (
              <StudentAttendanceRow
                key={student.id}
                student={student}
                status={record?.status || null}
                notes={record?.notes || ''}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
              />
            );
          })
        )}
      </div>

      <div className="attendance-footer">
        <button onClick={handleCancel} className="cancel-button" disabled={saving}>
          Cancelar
        </button>
        <button
          onClick={handleSaveAttendance}
          className="save-button"
          disabled={saving || summary.pending > 0}
        >
          {saving ? (
            <>
              <div className="button-spinner"></div>
              Guardando...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Guardar Asistencia
              {summary.pending > 0 && ` (${summary.pending} pendientes)`}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TakeAttendancePage;
