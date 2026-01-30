import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isAttendancePage = location.pathname.includes('/attendance');

  // No mostrar header en la página de tomar asistencia
  if (isAttendancePage) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1>Colegio Mosconi</h1>
        <p className="subtitle">Sistema de Gestión Escolar</p>
      </div>
    </header>
  );
};

export default Header;
