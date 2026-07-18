import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import "./MotoCard.css";

function MotoCard({ moto }) {
const imagenPrincipal =
Array.isArray(moto.imagenes) && moto.imagenes.length > 0
    ? moto.imagenes[0]
    : "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1000&q=80";

return (
<article className="moto-card">
    <Link to={`/motos/${moto._id}`} className="moto-card__detail-link" aria-label={`Ver detalles de ${moto.nombre}`}>
    <div className="moto-card__image-container">
    <img
        src={imagenPrincipal}
        alt={`${moto.marca?.nombre || ""} ${moto.nombre || ""}`}
        className="moto-card__image"
    />

    <div className="moto-card__badges">
        {moto.destacada && (
        <span className="moto-card__badge moto-card__badge--featured">
            <i className="bi bi-star-fill"></i>
            Destacada
        </span>
        )}

        <span
        className={`moto-card__badge ${
            moto.disponible === false
            ? "moto-card__badge--unavailable"
            : "moto-card__badge--available"
        }`}
        >
        {moto.disponible === false ? "No disponible" : "Disponible"}
        </span>
    </div>

    <div className="moto-card__image-overlay"></div>
    </div>
    </Link>

    <div className="moto-card__content">
    <div className="moto-card__header">
        <span className="moto-card__brand">
        {moto.marca?.nombre || "Marca"}
        </span>

        <span className="moto-card__category">
        {moto.categoria?.nombre || "Moto"}
        </span>
    </div>

    <h3><Link to={`/motos/${moto._id}`}>{moto.nombre}</Link></h3>

    <div className="moto-card__specs">
        <div className="moto-card__spec">
        <i className="bi bi-speedometer2"></i>

        <div>
            <span>Cilindrada</span>
            <strong>{moto.cilindrada || "-"} cc</strong>
        </div>
        </div>

        <div className="moto-card__spec">
        <i className="bi bi-box-seam"></i>

        <div>
            <span>Stock</span>
            <strong>{moto.stock ?? 0} unidades</strong>
        </div>
        </div>
    </div>

    <div className="moto-card__footer">
        <div className="moto-card__price">
        <span>Precio</span>
        <strong>{formatPrice(moto.precio, moto.moneda)}</strong>
        </div>

        <Link to={`/motos/${moto._id}`} className="moto-card__button">Ver detalles <i className="bi bi-arrow-right"></i></Link>
    </div>
    </div>
</article>
);
}

export default MotoCard;
