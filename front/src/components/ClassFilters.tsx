import './ClassFilters.css';

interface ClassFiltersProps {
  filterName: string;
  filterYear: string;
  onFilterNameChange: (value: string) => void;
  onFilterYearChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const ClassFilters = ({
  filterName,
  filterYear,
  onFilterNameChange,
  onFilterYearChange,
  onSearch,
  onClear,
}: ClassFiltersProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="filters-section">
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="filterName">Nombre de la clase</label>
          <input
            type="text"
            id="filterName"
            placeholder="Buscar por nombre..."
            value={filterName}
            onChange={(e) => onFilterNameChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filterYear">Año</label>
          <input
            type="number"
            id="filterYear"
            placeholder="Buscar por año..."
            value={filterYear}
            onChange={(e) => onFilterYearChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="filter-actions">
          <button onClick={onSearch} className="search-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Buscar
          </button>
          <button onClick={onClear} className="clear-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassFilters;
