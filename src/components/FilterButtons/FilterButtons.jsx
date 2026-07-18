import "./FilterButtons.css";

function FilterButtons({
titulo,
items,
valorSeleccionado,
onSeleccionar,
}) {
return (
<div className="filter-buttons">
    <span className="filter-buttons__title">{titulo}</span>

    <div className="filter-buttons__list">
    <button
        type="button"
        className={!valorSeleccionado ? "is-active" : ""}
        onClick={() => onSeleccionar("")}
    >
        Todas
    </button>

    {items.map((item) => (
        <button
        key={item._id}
        type="button"
        className={valorSeleccionado === item.nombre ? "is-active" : ""}
        onClick={() => onSeleccionar(item.nombre)}
        >
        {item.nombre}
        </button>
    ))}
    </div>
</div>
);
}

export default FilterButtons;