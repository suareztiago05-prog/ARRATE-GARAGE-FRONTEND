import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { obtenerPerfil } from "../../services/auth.service";
import { eliminarSesion, obtenerToken } from "../../utils/auth";
import "./ProtectedRoute.css";

function ProtectedRoute({ children, soloAdmin = false }) {
const [estado, setEstado] = useState({
cargando: true,
autorizado: false,
});

useEffect(() => {
// eslint-disable-next-line react-hooks/immutability
verificarSesion();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const verificarSesion = async () => {
const token = obtenerToken();

if (!token) {
    setEstado({
    cargando: false,
    autorizado: false,
    });

    return;
}

try {
    const respuesta = await obtenerPerfil();
    const usuario = respuesta.data;

    const autorizado =
    !soloAdmin || usuario?.rol === "admin";

    setEstado({
    cargando: false,
    autorizado,
    });
} catch (error) {
    console.error("Error al verificar sesión:", error);

    eliminarSesion();

    setEstado({
    cargando: false,
    autorizado: false,
    });
}
};

if (estado.cargando) {
return (
    <div className="protected-route__loading">
    <div className="protected-route__spinner"></div>
    <p>Verificando sesión...</p>
    </div>
);
}

if (!estado.autorizado) {
return <Navigate to="/admin/login" replace />;
}

return children;
}

export default ProtectedRoute;
