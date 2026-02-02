import { useState } from 'react';
import './ManagePeriodsSection.css';
import CreateAcademicPeriodModal from './CreateAcademicPeriodModal';

interface AcademicPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  year: number;
  isActive: boolean;
}

interface ManagePeriodsSectionProps {
  classId: number;
  className: string;
  periods: AcademicPeriod[];
  onPeriodsUpdated: () => void;
}

const ManagePeriodsSection = ({
  classId,
  className,
  periods,
  onPeriodsUpdated,
}: ManagePeriodsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePeriodCreated = () => {
    setIsModalOpen(false);
    onPeriodsUpdated();
  };

  const formatDate = (dateString: string) => {
    // Parsear la fecha como local, no UTC, para evitar problemas de zona horaria
    const [year, month, day] = dateString.split('T')[0].split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleToggleActive = async (periodId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/academic-periods/${periodId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el período');
      }

      onPeriodsUpdated();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el período activo');
    }
  };

  if (periods.length === 0) {
    return (
      <>
        <div className="periods-section">
          <div className="periods-empty">
            <div className="empty-icon">📅</div>
            <h3>No hay períodos académicos</h3>
            <p>Esta clase necesita al menos un período académico para poder tomar asistencia.</p>
            <button onClick={handleOpenModal} className="create-period-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Crear Primer Período
            </button>
          </div>
        </div>

        {isModalOpen && (
          <CreateAcademicPeriodModal
            classId={classId}
            className={className}
            onClose={handleCloseModal}
            onSuccess={handlePeriodCreated}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="periods-section">
        <div className="periods-header">
          <h2>📅 Períodos Académicos</h2>
          <button onClick={handleOpenModal} className="add-period-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Agregar Período
          </button>
        </div>

        <div className="periods-list">
          {periods.map((period) => (
            <div key={period.id} className={`period-card ${period.isActive ? 'active' : ''}`}>
              <div className="period-info">
                <div className="period-name">
                  {period.name}
                  {period.isActive && <span className="active-badge">Activo</span>}
                </div>
                <div className="period-dates">
                  <span>📅 {formatDate(period.startDate)}</span>
                  <span>→</span>
                  <span>{formatDate(period.endDate)}</span>
                </div>
                <div className="period-year">Año lectivo: {period.year}</div>
              </div>
              <div className="period-actions">
                <button
                  onClick={() => handleToggleActive(period.id, period.isActive)}
                  className={`toggle-active-button ${period.isActive ? 'active' : ''}`}
                  title={period.isActive ? 'Desactivar período' : 'Activar período'}
                >
                  {period.isActive ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Activo
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Activar
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CreateAcademicPeriodModal
          classId={classId}
          className={className}
          onClose={handleCloseModal}
          onSuccess={handlePeriodCreated}
        />
      )}
    </>
  );
};

export default ManagePeriodsSection;
