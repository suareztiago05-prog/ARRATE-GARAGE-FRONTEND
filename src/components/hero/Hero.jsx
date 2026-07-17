import "./Hero.css";

function Hero() {
return (
<section className="hero">
    <div className="hero__overlay">
    <div className="hero__content">
        <span className="hero__tag">Arrate Motos</span>

        <h1>Encontrá la moto que estás buscando</h1>

        <p>
        Explorá nuestro catálogo de motos, compará modelos y consultá
        disponibilidad.
        </p>

        <a href="#catalogo" className="hero__button">
        Ver catálogo
        </a>
    </div>
    </div>
</section>
);
}

export default Hero;