import { useEffect, useState } from 'react';
import ClassCard from '../components/ClassCard';
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

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/classes');
      if (!response.ok) {
        throw new Error('Error al cargar las clases');
      }
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <main className="main-content">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando clases...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={fetchClasses} className="retry-button">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && classes.length === 0 && (
          <div className="empty-state">
            <p>No hay clases registradas</p>
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
    </div>
  );
};

export default HomePage;
