import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentList from '../components/StudentList';
import RegisterStudentModal from '../components/RegisterStudentModal';
import ManagePeriodsSection from '../components/ManagePeriodsSection';
import './ClassPage.css';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  statistics?: {
    total: number;
    present: number;
    absent: number;
    late: number;
    justified: number;
    attendanceRate: string;
  };
}

interface AcademicPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  year: number;
  isActive: boolean;
}

interface Class {
  id: number;
  name: string;
  year: number;
  students: Student[];
  academicPeriods?: AcademicPeriod[];
}

const ClassPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClassData();
  }, [classId]);

  const fetchClassData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/classes/${classId}`);
      if (!response.ok) {
        throw new Error('Error al cargar la clase');
      }
      const data = await response.json();
      
      // Obtener períodos académicos de la clase
      const periodsResponse = await fetch(`http://localhost:3000/academic-periods/class/${classId}`);
      if (periodsResponse.ok) {
        const periodsData = await periodsResponse.json();
        data.academicPeriods = periodsData;
      } else {
        data.academicPeriods = [];
      }

      // Obtener estadísticas de asistencia
      const reportResponse = await fetch(`http://localhost:3000/attendance/class/${classId}/report`);
      if (reportResponse.ok) {
        const reportData = await reportResponse.json();
        data.students = data.students.map((student: Student) => {
          const stats = reportData.students.find((s: any) => s.student.id === student.id);
          return {
            ...student,
            statistics: stats?.statistics
          };
        });
      }
      
      setClassData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStudentRegistered = () => {
    setIsModalOpen(false);
    fetchClassData();
  };

  const handlePeriodsUpdated = () => {
    fetchClassData();
  };

  if (loading) {
    return (
      <div className="class-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando información de la clase...</p>
        </div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="class-page">
        <div className="error-message">
          <p>❌ {error || 'No se pudo cargar la clase'}</p>
          <button onClick={handleBack} className="back-button">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="class-page">
      <div className="class-header-section">
        <button onClick={handleBack} className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver
        </button>
        
        <div className="class-info-header">
          <h1>{classData.name}</h1>
          <div className="class-meta-actions">
            <div className="class-meta">
              <span className="meta-item">📅 Año {classData.year}</span>
              <span className="meta-item">👥 {classData.students.length} estudiantes</span>
            </div>
            <button className="take-attendance-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tomar Asistencia
            </button>
          </div>
        </div>
      </div>

      <div className="class-content">
        <ManagePeriodsSection
          classId={parseInt(classId || '0')}
          className={classData.name}
          periods={classData.academicPeriods || []}
          onPeriodsUpdated={handlePeriodsUpdated}
        />

        <StudentList students={classData.students} onRegisterClick={handleOpenModal} />
      </div>

      {isModalOpen && (
        <RegisterStudentModal
          classId={parseInt(classId || '0')}
          onClose={handleCloseModal}
          onSuccess={handleStudentRegistered}
        />
      )}
    </div>
  );
};

export default ClassPage;
