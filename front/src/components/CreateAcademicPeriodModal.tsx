import { useState } from 'react';
import './CreateAcademicPeriodModal.css';

interface CreateAcademicPeriodModalProps {
  classId: number;
  className: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateAcademicPeriodModal = ({
  classId,
  className,
  onClose,
  onSuccess,
}: CreateAcademicPeriodModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    year: new Date().getFullYear(),
    isActive: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        year: parseInt(formData.year.toString()),
        classId: classId,
        isActive: formData.isActive,
      };

      const response = await fetch('http://localhost:3000/academic-periods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el período académico');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Crear Período Académico</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-class-info">
          <span className="class-badge">{className}</span>
        </div>

        <form onSubmit={handleSubmit} className="period-form">
          <div className="form-group">
            <label htmlFor="name">Nombre del período *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej: Primer Trimestre, Segundo Cuatrimestre"
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Fecha de inicio *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Fecha de fin *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="year">Año lectivo *</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="2020"
              max="2050"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Marcar como período activo</span>
            </label>
            <p className="checkbox-hint">
              Solo un período puede estar activo a la vez. Esto determinará en qué período se registrará la asistencia.
            </p>
          </div>

          {error && (
            <div className="form-error">
              <span>❌ {error}</span>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  Creando...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Crear Período
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAcademicPeriodModal;
