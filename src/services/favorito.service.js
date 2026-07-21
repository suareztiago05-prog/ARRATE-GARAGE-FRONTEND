import api from "../api/api";

export const obtenerFavoritos = async () => {
  const respuesta = await api.get("/favoritos");
  return respuesta.data;
};

export const agregarFavorito = async (motoId) => {
  const respuesta = await api.post(`/favoritos/${motoId}`);
  return respuesta.data;
};

export const eliminarFavorito = async (motoId) => {
  const respuesta = await api.delete(`/favoritos/${motoId}`);
  return respuesta.data;
};
