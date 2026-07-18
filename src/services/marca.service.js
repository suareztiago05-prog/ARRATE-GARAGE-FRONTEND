import api from "../api/api";

export const obtenerMarcas = async () => {
const response = await api.get("/marcas");
return response.data;
};

export const crearMarca = async (datos) => (await api.post("/marcas", datos)).data;
export const actualizarMarca = async (id, datos) => (await api.put(`/marcas/${id}`, datos)).data;
export const eliminarMarca = async (id) => (await api.delete(`/marcas/${id}`)).data;
