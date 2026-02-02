import './StudentAttendanceRow.css';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified';

interface StudentAttendanceRowProps {
  student: {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
  };
  status: AttendanceStatus | null;
  notes: string;
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
  onNotesChange: (studentId: number, notes: string) => void;
}

const StudentAttendanceRow = ({
  student,
  status,
  notes,
  onStatusChange,
  onNotesChange,
}: StudentAttendanceRowProps) => {
  const statusOptions: { value: AttendanceStatus; label: string; icon: string; color: string }[] = [
    { value: 'present', label: 'Presente', icon: '✓', color: '#27ae60' },
    { value: 'absent', label: 'Ausente', icon: '✗', color: '#e74c3c' },
    { value: 'late', label: 'Tarde', icon: '⏰', color: '#f39c12' },
    { value: 'justified', label: 'Justificado', icon: '📝', color: '#3498db' },
  ];

  return (
    <div className="student-attendance-row">
      <div className="student-info">
        <div className="student-avatar">
          {student.firstName[0]}{student.lastName[0]}
        </div>
        <div className="student-details">
          <div className="student-name">
            {student.firstName} {student.lastName}
          </div>
          <div className="student-dni">DNI: {student.dni}</div>
        </div>
      </div>

      <div className="attendance-actions">
        <div className="status-buttons">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`status-button ${status === option.value ? 'active' : ''}`}
              style={{
                backgroundColor: status === option.value ? option.color : 'transparent',
                borderColor: option.color,
                color: status === option.value ? 'white' : option.color,
              }}
              onClick={() => onStatusChange(student.id, option.value)}
              title={option.label}
            >
              <span className="status-icon">{option.icon}</span>
              <span className="status-label">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="notes-input-container">
          <input
            type="text"
            className="notes-input"
            placeholder="Notas (opcional)"
            value={notes}
            onChange={(e) => onNotesChange(student.id, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceRow;
