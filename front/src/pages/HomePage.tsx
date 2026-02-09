import { useEffect, useState } from 'react';
import ClassCard from '../components/ClassCard';
import ClassFilters from '../components/ClassFilters';
import RegisterClassModal from '../components/RegisterClassModal';
import { API_URL } from '../config/api';
import './HomePage.css';

interface Class {
  id: number;
  name: string;
  year: number;
  section?: string;
}

const HomePage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para los filtros
  const [filterName, setFilterName] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Estado para el modal de registro de clase
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async (name?: string, year?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Construir URL con query parameters solo si tienen valor
      const params = new URLSearchParams();
      if (name && name.trim()) {
        params.append('name', name.trim());
      }
      if (year && year.trim()) {
        params.append('year', year.trim());
      }
      
      const url = `${API_URL}/classes${params.toString() ? '?' + params.toString() : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al cargar las clases');
      }
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Solo buscar si al menos un filtro tiene valor
    const trimmedName = filterName.trim();
    const trimmedYear = filterYear.trim();
    
    if (!trimmedName && !trimmedYear) {
      // Si ambos filtros están vacíos, cargar todas las clases
      fetchClasses();
    } else {
      fetchClasses(trimmedName, trimmedYear);
    }
  };

  const handleClearFilters = () => {
    setFilterName('');
    setFilterYear('');
    fetchClasses();
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleClassRegistered = () => {
    setIsRegisterModalOpen(false);
    handleClearFilters(); // Recargar todas las clases
  };

  return (
    <div className="home-page">
      <main className="main-content">
        <ClassFilters
          filterName={filterName}
          filterYear={filterYear}
          onFilterNameChange={setFilterName}
          onFilterYearChange={setFilterYear}
          onSearch={handleSearch}
          onClear={handleClearFilters}
          onRegisterClass={handleOpenRegisterModal}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando clases...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>❌ Error al cargar las clases</p>
            <button onClick={() => fetchClasses()} className="retry-button">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && classes.length === 0 && (
          <div className="empty-state">
            <p>No se encontraron clases{(filterName.trim() || filterYear.trim()) ? ' con los filtros aplicados' : ''}</p>
            {(filterName.trim() || filterYear.trim()) && (
              <button onClick={handleClearFilters} className="clear-filters-link">
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {!loading && !error && classes.length > 0 && (
          <div className="classes-grid">
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} classData={classItem} />
            ))}
          </div>
        )}
      </main>

      {isRegisterModalOpen && (
        <RegisterClassModal
          onClose={handleCloseRegisterModal}
          onSuccess={handleClassRegistered}
        />
      )}
    </div>
  );
};

export default HomePage;
