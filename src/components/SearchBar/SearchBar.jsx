import "./SearchBar.css";

function SearchBar({ busqueda, onCambiarBusqueda }) {
    return (
        <div className="search-bar">
        <label htmlFor="busqueda-moto">Buscar moto</label>

        <div className="search-bar__control">
            <i className="bi bi-search"></i>

            <input
            id="busqueda-moto"
            type="search"
            value={busqueda}
            placeholder="Nombre, marca, categoría o cilindrada..."
            onChange={(event) => onCambiarBusqueda(event.target.value)}
            />

            {busqueda && (
            <button
                type="button"
                aria-label="Limpiar búsqueda"
                onClick={() => onCambiarBusqueda("")}
            >
                <i className="bi bi-x-lg"></i>
            </button>
            )}
        </div>
        </div>
    );
}

export default SearchBar;