import "./MotoCard.css";

function MotoCard({ moto }) {
const imagenPrincipal =
Array.isArray(moto.imagenes) && moto.imagenes.length > 0
    ? moto.imagenes[0]
    : "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1000&q=80";

const mostrarPrecio = () => {
if (!moto.precio || Number(moto.precio) <= 0) {
    return "Consultar precio";
}

return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
}).format(Number(moto.precio));
};

const mensajeWhatsApp = encodeURIComponent(
`Hola, quiero consultar por la ${moto.marca?.nombre || ""} ${
    moto.nombre || ""
}.`,
);

return (
<article className="moto-card">
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

    <div className="moto-card__content">
    <div className="moto-card__header">
        <span className="moto-card__brand">
        {moto.marca?.nombre || "Marca"}
        </span>

        <span className="moto-card__category">
        {moto.categoria?.nombre || "Moto"}
        </span>
    </div>

    <h3>{moto.nombre}</h3>

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
        <strong>{mostrarPrecio()}</strong>
        </div>

        <a
        href={`https://wa.me/5492230000000?text=${mensajeWhatsApp}`}
        target="_blank"
        rel="noreferrer"
        className="moto-card__button"
        >
        Consultar
        <i className="bi bi-arrow-up-right"></i>
        </a>
    </div>
    </div>
</article>
);
}

export default MotoCard;