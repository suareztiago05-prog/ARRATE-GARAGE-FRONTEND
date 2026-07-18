import api from "../api/api";

export const obtenerMotos = async () => {
  const response = await api.get("/motos");
  return response.data;
};

export const obtenerMotoPorId = async (id) => {
  const response = await api.get(`/motos/${id}`);
  return response.data;
};

export const crearMoto = async (datos) => {
  const response = await api.post("/motos", datos);
  return response.data;
};

export const actualizarMoto = async (id, datos) => {
  const response = await api.put(`/motos/${id}`, datos);
  return response.data;
};

export const eliminarMoto = async (id) => {
  const response = await api.delete(`/motos/${id}`);
  return response.data;
};
