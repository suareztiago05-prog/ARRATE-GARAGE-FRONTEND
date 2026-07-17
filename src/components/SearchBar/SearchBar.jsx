import "./SearchBar.css";

function SearchBar({ busqueda, onCambiarBusqueda }) {
return (
<div className="search-bar">
    <i className="bi bi-search search-bar__icono"></i>

    <input
    type="text"
    value={busqueda}
    onChange={(event) => onCambiarBusqueda(event.target.value)}
    placeholder="Buscar por nombre, marca, categoría o cilindrada..."
    className="search-bar__input"
    />

    {busqueda && (
    <button
        type="button"
        className="search-bar__limpiar"
        onClick={() => onCambiarBusqueda("")}
        aria-label="Limpiar búsqueda"
    >
        <i className="bi bi-x-lg"></i>
    </button>
    )}
</div>
);
}

export default SearchBar;