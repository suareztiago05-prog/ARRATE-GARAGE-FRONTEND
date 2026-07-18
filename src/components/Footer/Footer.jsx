import "./Footer.css";

function Footer() {
const anioActual = new Date().getFullYear();

return (
<footer id="contacto" className="footer">
    <div className="footer__container">
    <div className="footer__main">
        <div className="footer__brand">
        <div className="footer__logo">
            <span>
            <i className="bi bi-lightning-charge-fill"></i>
            </span>

            <div>
            ARRATE
            <strong>GARAGE</strong>
            </div>
        </div>

        <p>
            Catálogo digital de Arrate Motos. Encontrá modelos disponibles y
            recibí asesoramiento personalizado.
        </p>
        </div>

        <div className="footer__column">
        <h3>Navegación</h3>

        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#financiacion">Financiación</a>
        <a href="#contacto">Contacto</a>
        </div>

        <div className="footer__column">
        <h3>Contacto</h3>

        <a
              href="https://wa.me/5492235896986"
            target="_blank"
            rel="noreferrer"
        >
            <i className="bi bi-whatsapp"></i>
            WhatsApp
        </a>

        <span>
            <i className="bi bi-geo-alt"></i>
            Mar del Plata
        </span>

        <span>
            <i className="bi bi-clock"></i>
            Atención comercial
        </span>
        </div>

        <div className="footer__cta">
        <span>¿Encontraste una moto?</span>
        <h3>Consultá disponibilidad ahora.</h3>

        <a
              href="https://wa.me/5492235896986"
            target="_blank"
            rel="noreferrer"
        >
            Hablar con un asesor
            <i className="bi bi-arrow-up-right"></i>
        </a>
        </div>
    </div>

    <div className="footer__bottom">
        <p>© {anioActual} Arrate Garage. Todos los derechos reservados.</p>

        <span>Desarrollado para Arrate Motos</span>
    </div>
    </div>
</footer>
);
}

export default Footer;
