import api from "../api/api";

export const obtenerCategorias = async () => {
const response = await api.get("/categorias");
return response.data;
};

export const crearCategoria = async (datos) => (await api.post("/categorias", datos)).data;
export const actualizarCategoria = async (id, datos) => (await api.put(`/categorias/${id}`, datos)).data;
export const eliminarCategoria = async (id) => (await api.delete(`/categorias/${id}`)).data;
