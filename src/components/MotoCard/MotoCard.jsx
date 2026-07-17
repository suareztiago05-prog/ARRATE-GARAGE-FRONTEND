import "./MotoCard.css";

function MotoCard({ moto }) {
const imagenPrincipal =
moto.imagenes && moto.imagenes.length > 0 ? moto.imagenes[0] : null;

return (
<article className="moto-card">
    <div className="moto-card__imagen">
    {imagenPrincipal ? (
        <img
        src={imagenPrincipal}
        alt={moto.nombre}
        className="moto-card__foto"
        />
    ) : (
        <span>Imagen no disponible</span>
    )}
    </div>

    <div className="moto-card__contenido">
    <span className="moto-card__marca">
        {moto.marca?.nombre || "Marca no disponible"}
    </span>

    <h3>{moto.nombre}</h3>

    <p>
        {moto.cilindrada} cc ·{" "}
        {moto.categoria?.nombre || "Sin categoría"}
    </p>

    <button type="button">Ver detalles</button>
    </div>
</article>
);
}

export default MotoCard;