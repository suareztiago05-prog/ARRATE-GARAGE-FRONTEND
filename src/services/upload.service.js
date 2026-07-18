import api from "../api/api";

export const subirImagen = async (file) => {
  const formData = new FormData();
  formData.append("imagen", file);
  const response = await api.post("/uploads/image", formData);
  return response.data;
};
