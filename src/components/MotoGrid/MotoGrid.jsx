import MotoCard from "../MotoCard/MotoCard";
import "./MotoGrid.css";

function MotoGrid({ motos, cargando, error }) {
if (cargando) {
return <p className="moto-grid__mensaje">Cargando motos...</p>;
}

if (error) {
return <p className="moto-grid__mensaje moto-grid__mensaje--error">{error}</p>;
}

if (motos.length === 0) {
return <p className="moto-grid__mensaje">No hay motos cargadas.</p>;
}

return (
<div className="moto-grid">
    {motos.map((moto) => (
    <MotoCard key={moto._id} moto={moto} />
    ))}
</div>
);
}

export default MotoGrid;