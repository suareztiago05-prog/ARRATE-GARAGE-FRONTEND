import { useState } from "react";
import { subirImagen } from "../../services/upload.service";
import "./AdminMotoForm.css";

const EMPTY = { nombre: "", marca: "", categoria: "", precio: "", moneda: "ARS", cilindrada: "", descripcion: "", imagenes: "", stock: "0", destacada: false, disponible: true };

function AdminMotoForm({ moto, marcas, categorias, guardando, onGuardar, onCancelar }) {
  const [data, setData] = useState(() => moto ? {
    nombre: moto.nombre || "", marca: moto.marca?._id || moto.marca || "", categoria: moto.categoria?._id || moto.categoria || "",
    precio: moto.precio ?? "", moneda: moto.moneda || "ARS", cilindrada: moto.cilindrada ?? "", descripcion: moto.descripcion || "",
    imagenes: Array.isArray(moto.imagenes) ? moto.imagenes.join("\n") : "", stock: moto.stock ?? 0,
    destacada: Boolean(moto.destacada), disponible: moto.disponible !== false,
  } : EMPTY);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const change = ({ target }) => setData((current) => ({ ...current, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  const uploadFiles = async ({ target }) => {
    const files = Array.from(target.files || []);
    if (!files.length) return;
    try {
      setUploading(true); setImageError("");
      const responses = await Promise.all(files.map((file) => subirImagen(file)));
      const urls = responses.map((response) => response.data.url);
      setData((current) => ({ ...current, imagenes: [current.imagenes, ...urls].filter(Boolean).join("\n") }));
    } catch (error) {
      setImageError(error.response?.data?.message || "No se pudieron subir las imágenes.");
    } finally {
      setUploading(false); target.value = "";
    }
  };
  const submit = (event) => {
    event.preventDefault();
    onGuardar({ ...data, precio: Number(data.precio), cilindrada: Number(data.cilindrada), stock: Number(data.stock), imagenes: data.imagenes.split("\n").map((url) => url.trim()).filter(Boolean) });
  };

  return <div className="admin-form__backdrop" onMouseDown={onCancelar}><section className="admin-form" onMouseDown={(event) => event.stopPropagation()}>
    <header className="admin-form__header"><div><span>{moto ? "Editar registro" : "Nuevo registro"}</span><h2>{moto ? "Editar moto" : "Agregar moto"}</h2></div><button type="button" onClick={onCancelar}><i className="bi bi-x-lg" /></button></header>
    <form onSubmit={submit}><div className="admin-form__grid">
      <label>Nombre<input name="nombre" value={data.nombre} onChange={change} required /></label>
      <label>Marca<select name="marca" value={data.marca} onChange={change} required><option value="">Seleccionar</option>{marcas.map((item) => <option key={item._id} value={item._id}>{item.nombre}</option>)}</select></label>
      <label>Categoría<select name="categoria" value={data.categoria} onChange={change} required><option value="">Seleccionar</option>{categorias.map((item) => <option key={item._id} value={item._id}>{item.nombre}</option>)}</select></label>
      <label>Precio<input name="precio" type="number" min="0" value={data.precio} onChange={change} required /></label>
      <label>Moneda<select name="moneda" value={data.moneda} onChange={change} required><option value="ARS">Pesos argentinos (ARS)</option><option value="USD">Dólares (USD)</option></select></label>
      <label>Cilindrada (cc)<input name="cilindrada" type="number" min="0" value={data.cilindrada} onChange={change} required /></label>
      <label>Stock<input name="stock" type="number" min="0" value={data.stock} onChange={change} required /></label>
      <label className="admin-form__wide">Descripción<textarea name="descripcion" rows="4" value={data.descripcion} onChange={change} required /></label>
      <label className="admin-form__wide">Imágenes<input type="file" accept="image/*" multiple onChange={uploadFiles} disabled={uploading} /><small>{uploading ? "Subiendo imágenes..." : "Seleccioná una o varias imágenes (máximo 5 MB cada una)."}</small>{imageError && <small style={{ color: "#ff9898" }}>{imageError}</small>}<textarea name="imagenes" rows="3" value={data.imagenes} onChange={change} placeholder="Las URLs subidas aparecerán acá" /></label>
    </div><div className="admin-form__checks"><label><input name="destacada" type="checkbox" checked={data.destacada} onChange={change} /> Destacada</label><label><input name="disponible" type="checkbox" checked={data.disponible} onChange={change} /> Disponible</label></div>
    <footer className="admin-form__actions"><button type="button" className="admin-form__cancel" onClick={onCancelar}>Cancelar</button><button type="submit" className="admin-form__save" disabled={guardando || uploading}>{guardando ? "Guardando..." : moto ? "Guardar cambios" : "Crear moto"}</button></footer></form>
  </section></div>;
}

export default AdminMotoForm;
