import MotoCard from "../MotoCard/MotoCard";
import "./MotoGrid.css";

function MotoGrid({ motos, cargando, error, favoritos = [], onAlternarFavorito }) {
if (cargando) {
return (
    <div className="moto-grid moto-grid--loading">
    {[1, 2, 3].map((item) => (
        <div key={item} className="moto-grid__skeleton">
        <div className="moto-grid__skeleton-image"></div>

        <div className="moto-grid__skeleton-content">
            <span></span>
            <span></span>
            <span></span>
        </div>
        </div>
    ))}
    </div>
);
}

if (error) {
return (
    <div className="moto-grid__error">
    <i className="bi bi-exclamation-triangle"></i>

    <div>
        <h3>No pudimos cargar el catálogo</h3>
        <p>{error}</p>
    </div>
    </div>
);
}

return (
<div className="moto-grid">
    {motos.map((moto) => (
    <MotoCard
        key={moto._id}
        moto={moto}
        esFavorita={favoritos.includes(moto._id)}
        onAlternarFavorito={onAlternarFavorito}
    />
    ))}
</div>
);
}

export default MotoGrid;
