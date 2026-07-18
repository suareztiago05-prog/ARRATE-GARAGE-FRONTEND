import "./Hero.css";

function Hero() {
return (
<section id="inicio" className="hero">
    <div className="hero__overlay">
    <div className="hero__container">
        <div className="hero__content">
        <span className="hero__tag">
            <i className="bi bi-lightning-charge-fill"></i>
            Arrate Motos
        </span>

        <h1>
            Tu próxima moto empieza <span>acá.</span>
        </h1>

        <p className="hero__description">
            Descubrí nuestro catálogo, compará modelos y recibí asesoramiento
            personalizado para elegir la moto ideal.
        </p>

        <div className="hero__actions">
            <a
            href="#catalogo"
            className="hero__button hero__button--primary"
            >
            Explorar catálogo
            <i className="bi bi-arrow-down-right"></i>
            </a>

            <a
                href="https://wa.me/5492235896986"
            target="_blank"
            rel="noreferrer"
            className="hero__button hero__button--secondary"
            >
            <i className="bi bi-whatsapp"></i>
            Hablar con un asesor
            </a>
        </div>

        <div className="hero__stats">
            <div className="hero__stat">
            <strong>Stock</strong>
            <span>Actualizado</span>
            </div>

            <div className="hero__stat">
            <strong>Financiación</strong>
            <span>Opciones disponibles</span>
            </div>

            <div className="hero__stat">
            <strong>Asesoramiento</strong>
            <span>Atención personalizada</span>
            </div>
        </div>
        </div>

        <div className="hero__floating-card">
        <span className="hero__floating-icon">
            <i className="bi bi-speedometer2"></i>
        </span>

        <div>
            <span>Viví la experiencia</span>
            <strong>Arrate Garage</strong>
        </div>
        </div>
    </div>
    </div>

    <a href="#catalogo" className="hero__scroll">
    <span>Descubrir</span>
    <i className="bi bi-chevron-down"></i>
    </a>
</section>
);
}

export default Hero;
