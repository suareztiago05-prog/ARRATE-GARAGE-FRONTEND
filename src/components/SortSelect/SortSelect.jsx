import "./SortSelect.css";

function SortSelect({ orden, onCambiarOrden }) {
return (
<div className="sort-select">
    <label htmlFor="orden-motos">Ordenar por</label>

    <div className="sort-select__control">
    <select
        id="orden-motos"
        value={orden}
        onChange={(event) => onCambiarOrden(event.target.value)}
    >
        <option value="recientes">Más recientes</option>
        <option value="precio-asc">Menor precio</option>
        <option value="precio-desc">Mayor precio</option>
        <option value="cilindrada-asc">Menor cilindrada</option>
        <option value="cilindrada-desc">Mayor cilindrada</option>
        <option value="nombre-asc">Nombre A-Z</option>
        <option value="nombre-desc">Nombre Z-A</option>
    </select>

    <i className="bi bi-chevron-down"></i>
    </div>
</div>
);
}

export default SortSelect;