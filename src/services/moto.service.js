import api from "../api/api";

export const obtenerMotos = async () => {
    const response = await api.get("/motos");
    return response.data;
};