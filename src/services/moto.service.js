import api from "../api/api";
import {
  withOfficialZontesImages,
  withOfficialZontesImagesList,
} from "../data/zontesImages";

export const obtenerMotos = async () => {
  const response = await api.get("/motos");
  const result = response.data;

  return {
    ...result,
    data: withOfficialZontesImagesList(result.data),
  };
};

export const obtenerMotoPorId = async (id) => {
  const response = await api.get(`/motos/${id}`);
  const result = response.data;

  return {
    ...result,
    data: withOfficialZontesImages(result.data),
  };
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
