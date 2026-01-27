import { useNavigate } from 'react-router-dom';
import './ClassCard.css';

interface ClassCardProps {
  classData: {
    id: number;
    name: string;
    year: number;
    section?: string;
    students?: any[];
  };
}

const ClassCard = ({ classData }: ClassCardProps) => {
  const navigate = useNavigate();
  const studentCount = classData.students?.length || 0;

  const handleClick = () => {
    navigate(`/class/${classData.id}`);
  };

  return (
    <div className="class-card" onClick={handleClick}>
      <div className="card-header">
        <div className="class-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 14L21 9L12 4L3 9L12 14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14L12 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 11.5V16.5C6 17.0523 8.68629 19 12 19C15.3137 19 18 17.0523 18 16.5V11.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="card-body">
        <h3 className="class-name">{classData.name}</h3>
        <div className="class-info">
          <div className="info-item">
            <span className="info-label">Año</span>
            <span className="info-value">{classData.year}</span>
          </div>
          {classData.section && (
            <div className="info-item">
              <span className="info-label">Sección</span>
              <span className="info-value">{classData.section}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="student-count">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{studentCount} estudiantes</span>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
