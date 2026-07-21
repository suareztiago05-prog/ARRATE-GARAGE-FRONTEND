import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { iniciarSesion } from "../services/auth.service";
import { guardarSesion } from "../utils/auth";
import "./AuthPublicPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await iniciarSesion(form);
      guardarSesion(response.data);
      const destino = searchParams.get("redirect") || "/";
      navigate(response.data.usuario.rol === "admin" ? "/admin" : destino, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return <main className="auth-public"><section className="auth-public__card">
    <Link to="/" className="auth-public__back">← Volver al catálogo</Link>
    <span className="auth-public__eyebrow">Arrate Garage</span><h1>Iniciar sesión</h1><p>Ingresá con tu cuenta verificada.</p>
    <form onSubmit={submit} className="auth-public__form">
      <label>Correo electrónico<input name="email" type="email" value={form.email} onChange={({ target }) => setForm((current) => ({ ...current, email: target.value }))} required /></label>
      <label>Contraseña<input name="password" type="password" value={form.password} onChange={({ target }) => setForm((current) => ({ ...current, password: target.value }))} required /></label>
      {error && <div className="auth-public__message auth-public__message--error">{error}</div>}
      <button disabled={loading}>{loading ? "Ingresando..." : "Iniciar sesión"}</button>
    </form>
    <p style={{ marginTop: 20 }}>¿No tenés cuenta? <Link to="/registro" style={{ color: "#ff6500" }}>Registrate</Link></p>
  </section></main>;
}

export default LoginPage;
