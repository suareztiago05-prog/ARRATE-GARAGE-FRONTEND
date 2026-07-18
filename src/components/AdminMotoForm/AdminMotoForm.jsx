import { useState } from "react";
import "./AdminMotoForm.css";

const VACIA = { nombre:"", marca:"", categoria:"", precio:"", cilindrada:"", descripcion:"", imagenes:"", stock:"0", destacada:false, disponible:true };

function AdminMotoForm({ moto, marcas, categorias, guardando, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(() => moto ? {
    nombre:moto.nombre||"", marca:moto.marca?._id||moto.marca||"", categoria:moto.categoria?._id||moto.categoria||"",
    precio:moto.precio??"", cilindrada:moto.cilindrada??"", descripcion:moto.descripcion||"",
    imagenes:Array.isArray(moto.imagenes)?moto.imagenes.join("\n"):"", stock:moto.stock??0,
    destacada:Boolean(moto.destacada), disponible:moto.disponible!==false,
  } : VACIA);
  const cambiar=({target})=>setDatos((x)=>({...x,[target.name]:target.type==="checkbox"?target.checked:target.value}));
  const enviar=(e)=>{e.preventDefault();onGuardar({...datos,precio:Number(datos.precio),cilindrada:Number(datos.cilindrada),stock:Number(datos.stock),imagenes:datos.imagenes.split("\n").map((x)=>x.trim()).filter(Boolean)});};
  return <div className="admin-form__backdrop" onMouseDown={onCancelar}><section className="admin-form" onMouseDown={(e)=>e.stopPropagation()}>
    <header className="admin-form__header"><div><span>{moto?"Editar registro":"Nuevo registro"}</span><h2>{moto?"Editar moto":"Agregar moto"}</h2></div><button type="button" onClick={onCancelar}><i className="bi bi-x-lg"/></button></header>
    <form onSubmit={enviar}><div className="admin-form__grid">
      <label>Nombre<input name="nombre" value={datos.nombre} onChange={cambiar} required/></label>
      <label>Marca<select name="marca" value={datos.marca} onChange={cambiar} required><option value="">Seleccionar</option>{marcas.map((x)=><option key={x._id} value={x._id}>{x.nombre}</option>)}</select></label>
      <label>Categoría<select name="categoria" value={datos.categoria} onChange={cambiar} required><option value="">Seleccionar</option>{categorias.map((x)=><option key={x._id} value={x._id}>{x.nombre}</option>)}</select></label>
      <label>Precio<input name="precio" type="number" min="0" value={datos.precio} onChange={cambiar} required/></label>
      <label>Cilindrada (cc)<input name="cilindrada" type="number" min="0" value={datos.cilindrada} onChange={cambiar} required/></label>
      <label>Stock<input name="stock" type="number" min="0" value={datos.stock} onChange={cambiar} required/></label>
      <label className="admin-form__wide">Descripción<textarea name="descripcion" rows="4" value={datos.descripcion} onChange={cambiar} required/></label>
      <label className="admin-form__wide">Imágenes (una URL por línea)<textarea name="imagenes" rows="3" value={datos.imagenes} onChange={cambiar} placeholder="https://..."/></label>
    </div><div className="admin-form__checks"><label><input name="destacada" type="checkbox" checked={datos.destacada} onChange={cambiar}/> Destacada</label><label><input name="disponible" type="checkbox" checked={datos.disponible} onChange={cambiar}/> Disponible</label></div>
    <footer className="admin-form__actions"><button type="button" className="admin-form__cancel" onClick={onCancelar}>Cancelar</button><button type="submit" className="admin-form__save" disabled={guardando}>{guardando?"Guardando...":moto?"Guardar cambios":"Crear moto"}</button></footer></form>
  </section></div>;
}
export default AdminMotoForm;
