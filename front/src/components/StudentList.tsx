import './StudentList.css';

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

interface StudentListProps {
  students: Student[];
  onRegisterClick: () => void;
}

const StudentList = ({ students, onRegisterClick }: StudentListProps) => {
  const getAttendanceColor = (rate: string) => {
    const percentage = parseFloat(rate);
    if (percentage >= 90) return '#27ae60';
    if (percentage >= 75) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="student-list">
      <div className="list-header">
        <div className="list-header-left">
          <h2>Estudiantes</h2>
        </div>
        <button onClick={onRegisterClick} className="register-student-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Registrar Estudiante
        </button>
      </div>

      {students.length === 0 ? (
        <div className="empty-students">
          <p>No hay estudiantes registrados en esta clase</p>
        </div>
      ) : (
        <div className="students-container">
          {students.map((student) => (
            <div key={student.id} className="student-row">
              <div className="student-basic-info">
                <div className="student-avatar-small">
                  <span>{student.firstName[0]}{student.lastName[0]}</span>
                </div>
                
                <div className="student-details">
                  <h3 className="student-name-compact">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="student-dni-compact">DNI: {student.dni}</p>
                </div>
              </div>

              {student.statistics ? (
                <div className="student-stats-horizontal">
                  <div className="stat-badge" style={{ 
                    backgroundColor: getAttendanceColor(student.statistics.attendanceRate) + '20',
                    borderColor: getAttendanceColor(student.statistics.attendanceRate)
                  }}>
                    <span className="stat-percentage" style={{ 
                      color: getAttendanceColor(student.statistics.attendanceRate) 
                    }}>
                      {student.statistics.attendanceRate}%
                    </span>
                    <span className="stat-label-small">Asistencia</span>
                  </div>
                  
                  <div className="stats-mini">
                    <div className="stat-mini present">
                      <span className="stat-icon-small">✓</span>
                      <span className="stat-number">{student.statistics.present}</span>
                    </div>
                    <div className="stat-mini absent">
                      <span className="stat-icon-small">✗</span>
                      <span className="stat-number">{student.statistics.absent}</span>
                    </div>
                    <div className="stat-mini late">
                      <span className="stat-icon-small">⏱</span>
                      <span className="stat-number">{student.statistics.late}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-stats">
                  <span>Sin estadísticas</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
