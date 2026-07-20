import "./Hero.css";

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__overlay">
        <div className="hero__container">
          <div className="hero__content">
            <span className="hero__tag">Arrate Motos</span>

            <h1>
              Tu próxima moto empieza <span>acá.</span>
            </h1>

            <p className="hero__description">
              Conocé los modelos disponibles y recibí asesoramiento para elegir
              la moto que mejor se adapte a vos.
            </p>

            <div className="hero__actions">
              <a
                href="#catalogo"
                className="hero__button hero__button--primary"
              >
                Ver motos
              </a>

              <a
                href="https://wa.me/5492235896986"
                target="_blank"
                rel="noreferrer"
                className="hero__button hero__button--secondary"
              >
                <i className="bi bi-whatsapp"></i>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
