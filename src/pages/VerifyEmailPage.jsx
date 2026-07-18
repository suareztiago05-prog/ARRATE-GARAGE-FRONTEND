import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verificarEmail } from "../services/auth.service";
import "./AuthPublicPage.css";

function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const verificationStarted = useRef(false);
  const [state, setState] = useState(() => token
    ? { loading: true, success: false, message: "Verificando tu correo..." }
    : { loading: false, success: false, message: "El enlace no contiene un token válido." });

  useEffect(() => {
    if (!token || verificationStarted.current) return;
    verificationStarted.current = true;

    verificarEmail(token)
      .then((response) => setState({ loading: false, success: true, message: response.message }))
      .catch((error) => setState({
        loading: false,
        success: false,
        message: error.response?.data?.message || "No se pudo verificar el correo.",
      }));
  }, [token]);

  return (
    <main className="auth-public">
      <section className="auth-public__card auth-public__card--center">
        <span className="auth-public__eyebrow">Arrate Garage</span>
        <h1>{state.loading ? "Verificando..." : state.success ? "Cuenta activada" : "No pudimos verificarte"}</h1>
        <div className={`auth-public__message ${state.success ? "auth-public__message--success" : "auth-public__message--error"}`}>
          {state.message}
        </div>
        {!state.loading && <Link to="/login" className="auth-public__button-link">Ir al inicio de sesión</Link>}
      </section>
    </main>
  );
}

export default VerifyEmailPage;
