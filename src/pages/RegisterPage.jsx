import { useState } from "react";
import { Link } from "react-router-dom";
import { registrarUsuario } from "../services/auth.service";
import "./AuthPublicPage.css";

function RegisterPage() {
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await registrarUsuario(form);
      setSuccess(response.message);
    } catch (requestError) {
      const data = requestError.response?.data;
      setError(data?.errors?.join(" ") || data?.message || "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-public">
      <section className="auth-public__card">
        <Link to="/" className="auth-public__back">← Volver al catálogo</Link>
        <span className="auth-public__eyebrow">Arrate Garage</span>
        <h1>Crear una cuenta</h1>
        <p>Registrate y verificá tu correo electrónico para activar tu cuenta.</p>

        {success ? (
          <div className="auth-public__message auth-public__message--success">
            <strong>Registro completado</strong>
            <span>{success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-public__form">
            <label>Nombre<input name="nombre" value={form.nombre} onChange={handleChange} required /></label>
            <label>Apellido<input name="apellido" value={form.apellido} onChange={handleChange} required /></label>
            <label>Correo electrónico<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
            <label>Contraseña<input name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required /></label>
            {error && <div className="auth-public__message auth-public__message--error">{error}</div>}
            <button disabled={loading}>{loading ? "Registrando..." : "Registrarme"}</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default RegisterPage;
