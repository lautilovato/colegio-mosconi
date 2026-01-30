import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>Colegio Mosconi</h1>
          <p className="subtitle">Sistema de Gestión Escolar</p>
        </div>
        <nav className="header-nav">
          <button className="nav-button" onClick={handleHomeClick}>
            Inicio
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
