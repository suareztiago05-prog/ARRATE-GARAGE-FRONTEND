import { useState } from "react";
import "./AdminEntityManager.css";

function AdminEntityManager({ tipo, items, onCrear, onEditar, onEliminar }) {
  const esMarca = tipo === "marca";
  const vacio = esMarca ? { nombre:"", pais:"", logo:"", activa:true } : { nombre:"", descripcion:"", activa:true };
  const [formulario,setFormulario]=useState(vacio); const [editando,setEditando]=useState(null); const [guardando,setGuardando]=useState(false); const [error,setError]=useState("");
  const cambiar=({target})=>setFormulario((x)=>({...x,[target.name]:target.type==="checkbox"?target.checked:target.value}));
  const limpiar=()=>{setFormulario(vacio);setEditando(null);setError("");};
  const editar=(item)=>{setEditando(item._id);setFormulario(esMarca?{nombre:item.nombre||"",pais:item.pais||"",logo:item.logo||"",activa:item.activa!==false}:{nombre:item.nombre||"",descripcion:item.descripcion||"",activa:item.activa!==false});setError("");};
  const enviar=async(e)=>{e.preventDefault();try{setGuardando(true);setError("");if(editando)await onEditar(editando,formulario);else await onCrear(formulario);limpiar();}catch(err){setError(err.response?.data?.message||`No se pudo guardar la ${tipo}.`);}finally{setGuardando(false);}};
  const borrar=async(item)=>{if(!window.confirm(`¿Eliminar ${item.nombre}?`))return;try{setError("");await onEliminar(item._id);}catch(err){setError(err.response?.data?.message||`No se pudo eliminar la ${tipo}.`);}};
  return <section className="entity-manager">
    <div className="entity-manager__form"><div className="entity-manager__title"><span>{editando?"Editar":"Nueva"} {tipo}</span><h2>{esMarca?"Gestionar marcas":"Gestionar categorías"}</h2></div>
      <form onSubmit={enviar}><label>Nombre<input name="nombre" value={formulario.nombre} onChange={cambiar} required/></label>
        {esMarca?<><label>País<input name="pais" value={formulario.pais} onChange={cambiar} required/></label><label>Logo (URL opcional)<input name="logo" type="url" value={formulario.logo} onChange={cambiar}/></label></>:<label>Descripción<textarea name="descripcion" rows="3" value={formulario.descripcion} onChange={cambiar}/></label>}
        <label className="entity-manager__check"><input name="activa" type="checkbox" checked={formulario.activa} onChange={cambiar}/> Activa</label>{error&&<p className="entity-manager__error">{error}</p>}
        <div className="entity-manager__actions">{editando&&<button type="button" onClick={limpiar}>Cancelar</button>}<button type="submit" className="primary" disabled={guardando}>{guardando?"Guardando...":editando?"Guardar cambios":"Agregar"}</button></div>
      </form></div>
    <div className="entity-manager__list"><header><h3>{esMarca?"Marcas disponibles":"Categorías disponibles"}</h3><span>{items.length}</span></header>{items.length===0?<p className="entity-manager__empty">Todavía no hay registros.</p>:items.map((item)=><article key={item._id}><div>{esMarca&&item.logo?<img src={item.logo} alt=""/>:<span className="entity-manager__avatar">{item.nombre.charAt(0).toUpperCase()}</span>}<div><strong>{item.nombre}</strong><small>{esMarca?item.pais:item.descripcion||"Sin descripción"}</small></div></div><div className="entity-manager__row-actions"><button type="button" onClick={()=>editar(item)}><i className="bi bi-pencil"/></button><button type="button" className="danger" onClick={()=>borrar(item)}><i className="bi bi-trash"/></button></div></article>)}</div>
  </section>;
}
export default AdminEntityManager;
