import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { iniciarSesion, obtenerPerfil } from "../services/auth.service";
import {
eliminarSesion,
guardarSesion,
haySesion,
} from "../utils/auth";
import "./AdminLoginPage.css";

function AdminLoginPage() {
const navigate = useNavigate();

const [formulario, setFormulario] = useState({
email: "",
password: "",
});

const [cargando, setCargando] = useState(false);
const [error, setError] = useState("");
const [mostrarPassword, setMostrarPassword] = useState(false);

if (haySesion()) {
return <Navigate to="/admin" replace />;
}

const manejarCambio = (event) => {
const { name, value } = event.target;

setFormulario((estadoAnterior) => ({
    ...estadoAnterior,
    [name]: value,
}));

setError("");
};

const manejarEnvio = async (event) => {
event.preventDefault();

try {
    setCargando(true);
    setError("");

    const respuestaLogin = await iniciarSesion(formulario);
    const { token, usuario } = respuestaLogin.data;

    if (usuario.rol !== "admin") {
    eliminarSesion();
    setError("Este usuario no tiene permisos de administrador.");
    return;
    }

    guardarSesion({
    token,
    usuario,
    });

    const respuestaPerfil = await obtenerPerfil();

    if (respuestaPerfil.data?.rol !== "admin") {
    eliminarSesion();
    setError("No se pudo verificar el rol de administrador.");
    return;
    }

    navigate("/admin", {
    replace: true,
    });
} catch (error) {
    console.error("Error de inicio de sesión:", error);

    eliminarSesion();

    setError(
    error.response?.data?.message ||
        "No se pudo iniciar sesión. Revisá tus datos.",
    );
} finally {
    setCargando(false);
}
};

return (
<main className="admin-login">
    <div className="admin-login__background"></div>

    <section className="admin-login__card">
    <a href="/" className="admin-login__back">
        <i className="bi bi-arrow-left"></i>
        Volver al catálogo
    </a>

    <div className="admin-login__brand">
        <span className="admin-login__brand-icon">
        <i className="bi bi-lightning-charge-fill"></i>
        </span>

        <div>
        <strong>ARRATE</strong>
        <span>GARAGE</span>
        </div>
    </div>

    <div className="admin-login__heading">
        <span>Acceso privado</span>
        <h1>Panel administrador</h1>

        <p>
        Ingresá con una cuenta autorizada para administrar el catálogo.
        </p>
    </div>

    <form className="admin-login__form" onSubmit={manejarEnvio}>
        <div className="admin-login__field">
        <label htmlFor="email">Correo electrónico</label>

        <div className="admin-login__control">
            <i className="bi bi-envelope"></i>

            <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@arrate.com"
            autoComplete="email"
            value={formulario.email}
            onChange={manejarCambio}
            required
            />
        </div>
        </div>

        <div className="admin-login__field">
        <label htmlFor="password">Contraseña</label>

        <div className="admin-login__control">
            <i className="bi bi-lock"></i>

            <input
            id="password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            placeholder="Ingresá tu contraseña"
            autoComplete="current-password"
            value={formulario.password}
            onChange={manejarCambio}
            required
            />

            <button
            type="button"
            className="admin-login__password-button"
            aria-label={
                mostrarPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
            onClick={() => setMostrarPassword(!mostrarPassword)}
            >
            <i
                className={
                mostrarPassword
                    ? "bi bi-eye-slash"
                    : "bi bi-eye"
                }
            ></i>
            </button>
        </div>
        </div>

        {error && (
        <div className="admin-login__error">
            <i className="bi bi-exclamation-circle-fill"></i>
            <span>{error}</span>
        </div>
        )}

        <button
        type="submit"
        className="admin-login__submit"
        disabled={cargando}
        >
        {cargando ? (
            <>
            <span className="admin-login__small-spinner"></span>
            Verificando...
            </>
        ) : (
            <>
            Iniciar sesión
            <i className="bi bi-arrow-right"></i>
            </>
        )}
        </button>
    </form>

    <p className="admin-login__security">
        <i className="bi bi-shield-lock"></i>
        Acceso protegido mediante JWT.
    </p>
    </section>
</main>
);
}

export default AdminLoginPage;