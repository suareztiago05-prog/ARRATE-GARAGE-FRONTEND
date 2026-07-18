import api from "../api/api";

export const iniciarSesion = async (credenciales) => {
const respuesta = await api.post("/auth/login", credenciales);
return respuesta.data;
};

export const obtenerPerfil = async () => {
const respuesta = await api.get("/auth/me");
return respuesta.data;
};

export const registrarUsuario = async (datos) => {
  const respuesta = await api.post("/auth/register", datos);
  return respuesta.data;
};

export const verificarEmail = async (token) => {
  const respuesta = await api.get("/auth/verify-email", {
    params: { token },
  });
  return respuesta.data;
};
