import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eliminarSesion, obtenerUsuarioGuardado } from "../../utils/auth";
import "./Navbar.css";

function Navbar() {
const usuario = obtenerUsuarioGuardado();
const [menuAbierto, setMenuAbierto] = useState(false);
const [conScroll, setConScroll] = useState(false);

useEffect(() => {
const controlarScroll = () => {
    setConScroll(window.scrollY > 30);
};

window.addEventListener("scroll", controlarScroll);

return () => {
    window.removeEventListener("scroll", controlarScroll);
};
}, []);

const cerrarMenu = () => {
setMenuAbierto(false);
};

return (
<header className={`navbar ${conScroll ? "navbar--scroll" : ""}`}>
    <div className="navbar__container">
    <Link to="/" className="navbar__logo" onClick={cerrarMenu}>
        <span className="navbar__logo-icon">
        <i className="bi bi-lightning-charge-fill"></i>
        </span>

        <span className="navbar__logo-text">
        ARRATE
        <strong>GARAGE</strong>
        </span>
    </Link>

    <nav
        className={`navbar__menu ${
        menuAbierto ? "navbar__menu--abierto" : ""
        }`}
    >
        <a href="#inicio" onClick={cerrarMenu}>
        Inicio
        </a>

        <a href="#catalogo" onClick={cerrarMenu}>
        Catálogo
        </a>

        <a href="#financiacion" onClick={cerrarMenu}>
        Financiación
        </a>

        <a href="#contacto" onClick={cerrarMenu}>
        Contacto
        </a>

        <Link to="/admin/login" onClick={cerrarMenu}>
        Administrador
        </Link>

        {usuario ? (
        <>
            <Link to="/favoritos" onClick={cerrarMenu}>
            Favoritos
            </Link>
            <Link
            to="/"
            onClick={() => {
                eliminarSesion();
                cerrarMenu();
            }}
            >
            Salir
            </Link>
        </>
        ) : (
        <>
            <Link to="/registro" onClick={cerrarMenu}>
            Registro
            </Link>
            <Link to="/login" onClick={cerrarMenu}>
            Ingresar
            </Link>
        </>
        )}

        <a
            href="https://wa.me/5492235896986"
        target="_blank"
        rel="noreferrer"
        className="navbar__mobile-whatsapp"
        onClick={cerrarMenu}
        >
        <i className="bi bi-whatsapp"></i>
        Consultar por WhatsApp
        </a>
    </nav>

    <div className="navbar__actions">
        <a
            href="https://wa.me/5492235896986"
        target="_blank"
        rel="noreferrer"
        className="navbar__whatsapp"
        >
        <i className="bi bi-whatsapp"></i>
        <span>WhatsApp</span>
        </a>

        <button
        type="button"
        className={`navbar__toggle ${
            menuAbierto ? "navbar__toggle--abierto" : ""
        }`}
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
        onClick={() => setMenuAbierto(!menuAbierto)}
        >
        <span></span>
        <span></span>
        <span></span>
        </button>
    </div>
    </div>
</header>
);
}

export default Navbar;
