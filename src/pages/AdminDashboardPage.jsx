import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMotoForm from "../components/AdminMotoForm/AdminMotoForm";
import AdminEntityManager from "../components/AdminEntityManager/AdminEntityManager";
import { actualizarMarca, crearMarca, eliminarMarca, obtenerMarcas } from "../services/marca.service";
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategorias } from "../services/categoria.service";
import { actualizarMoto, crearMoto, eliminarMoto, obtenerMotos } from "../services/moto.service";
import { eliminarSesion, obtenerUsuarioGuardado } from "../utils/auth";
import { formatPrice } from "../utils/formatPrice";
import "./AdminDashboardPage.css";

function AdminDashboardPage() {
  const navigate=useNavigate(); const usuario=obtenerUsuarioGuardado();
  const [motos,setMotos]=useState([]); const [marcas,setMarcas]=useState([]); const [categorias,setCategorias]=useState([]);
  const [cargando,setCargando]=useState(true); const [guardando,setGuardando]=useState(false); const [error,setError]=useState(""); const [mensaje,setMensaje]=useState("");
  const [formAbierto,setFormAbierto]=useState(false); const [motoEditando,setMotoEditando]=useState(null);
  const [seccion,setSeccion]=useState("motos");

  const cargar=async()=>{try{setCargando(true);setError("");const [rm,rma,rc]=await Promise.all([obtenerMotos(),obtenerMarcas(),obtenerCategorias()]);setMotos(rm.data||[]);setMarcas(rma.data||[]);setCategorias(rc.data||[]);}catch(e){setError(e.response?.data?.message||"No se pudieron cargar los datos.");}finally{setCargando(false);}};
  useEffect(()=>{
    // La carga inicial sincroniza el panel con la API al montar la ruta.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  },[]);
  const abrirNueva=()=>{setMotoEditando(null);setFormAbierto(true);setMensaje("");};
  const abrirEditar=(moto)=>{setMotoEditando(moto);setFormAbierto(true);setMensaje("");};
  const guardar=async(datos)=>{try{setGuardando(true);setError("");if(motoEditando)await actualizarMoto(motoEditando._id,datos);else await crearMoto(datos);setMensaje(motoEditando?"Moto actualizada correctamente.":"Moto creada correctamente.");setFormAbierto(false);setMotoEditando(null);await cargar();}catch(e){setError(e.response?.data?.message||"No se pudo guardar la moto.");}finally{setGuardando(false);}};
  const borrar=async(moto)=>{if(!window.confirm(`¿Eliminar ${moto.nombre}? Esta acción no se puede deshacer.`))return;try{setError("");await eliminarMoto(moto._id);setMensaje("Moto eliminada correctamente.");await cargar();}catch(e){setError(e.response?.data?.message||"No se pudo eliminar la moto.");}};
  const cerrarSesion=()=>{eliminarSesion();navigate("/admin/login",{replace:true});};
  const operarEntidad=async(operacion,...args)=>{await operacion(...args);setMensaje("Cambios guardados correctamente.");await cargar();};

  return <main className="admin-dashboard">
    <aside className="admin-dashboard__sidebar"><div className="admin-dashboard__logo"><span><i className="bi bi-lightning-charge-fill"/></span><div>ARRATE<strong>GARAGE</strong></div></div>
      <nav className="admin-dashboard__nav"><button type="button" className={seccion==="motos"?"is-active":""} onClick={()=>setSeccion("motos")}><i className="bi bi-bicycle"/>Motos</button><button type="button" className={seccion==="marcas"?"is-active":""} onClick={()=>setSeccion("marcas")}><i className="bi bi-tags"/>Marcas</button><button type="button" className={seccion==="categorias"?"is-active":""} onClick={()=>setSeccion("categorias")}><i className="bi bi-collection"/>Categorías</button></nav>
      <button type="button" className="admin-dashboard__logout" onClick={cerrarSesion}><i className="bi bi-box-arrow-left"/>Cerrar sesión</button>
    </aside>
    <section className="admin-dashboard__content">
      <header className="admin-dashboard__header"><div><span>Panel administrativo</span><h1>{seccion==="motos"?"Catálogo de motos":seccion==="marcas"?"Marcas":"Categorías"}</h1><p>Sesión: {usuario?.email}</p></div><div className="admin-dashboard__header-actions"><a href="/" target="_blank" rel="noreferrer">Ver sitio <i className="bi bi-box-arrow-up-right"/></a>{seccion==="motos"&&<button type="button" onClick={abrirNueva}><i className="bi bi-plus-lg"/>Nueva moto</button>}</div></header>
      <div className="admin-dashboard__stats"><article><span>Total</span><strong>{motos.length}</strong><p>motos registradas</p></article><article><span>Disponibles</span><strong>{motos.filter((x)=>x.disponible!==false).length}</strong><p>publicadas</p></article><article><span>Stock</span><strong>{motos.reduce((n,x)=>n+Number(x.stock||0),0)}</strong><p>unidades</p></article></div>
      {mensaje&&<div className="admin-dashboard__notice admin-dashboard__notice--ok"><i className="bi bi-check-circle"/>{mensaje}</div>}{error&&<div className="admin-dashboard__notice admin-dashboard__notice--error"><i className="bi bi-exclamation-triangle"/>{error}</div>}
      {seccion==="motos"&&<section className="admin-dashboard__panel"><div className="admin-dashboard__panel-head"><div><h2>Motos</h2><p>Crear, editar y eliminar modelos del catálogo.</p></div><button type="button" onClick={cargar}><i className="bi bi-arrow-clockwise"/>Actualizar</button></div>
        {cargando?<p className="admin-dashboard__empty">Cargando motos...</p>:motos.length===0?<div className="admin-dashboard__empty"><i className="bi bi-bicycle"/><h3>No hay motos</h3><button type="button" onClick={abrirNueva}>Crear la primera</button></div>:<div className="admin-dashboard__table-wrap"><table><thead><tr><th>Moto</th><th>Marca / Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{motos.map((moto)=><tr key={moto._id}><td><div className="admin-dashboard__moto"><img src={moto.imagenes?.[0]||"https://placehold.co/120x80/222/aaa?text=Moto"} alt=""/><strong>{moto.nombre}</strong></div></td><td>{moto.marca?.nombre||"-"}<small>{moto.categoria?.nombre||"-"}</small></td><td>{formatPrice(moto.precio,moto.moneda)}</td><td>{moto.stock??0}</td><td><span className={moto.disponible!==false?"status-ok":"status-off"}>{moto.disponible!==false?"Disponible":"Oculta"}</span></td><td><div className="admin-dashboard__row-actions"><button type="button" onClick={()=>abrirEditar(moto)} aria-label="Editar"><i className="bi bi-pencil"/></button><button type="button" className="danger" onClick={()=>borrar(moto)} aria-label="Eliminar"><i className="bi bi-trash"/></button></div></td></tr>)}</tbody></table></div>}
      </section>}
      {seccion==="marcas"&&<AdminEntityManager tipo="marca" items={marcas} onCrear={(d)=>operarEntidad(crearMarca,d)} onEditar={(id,d)=>operarEntidad(actualizarMarca,id,d)} onEliminar={(id)=>operarEntidad(eliminarMarca,id)}/>}
      {seccion==="categorias"&&<AdminEntityManager tipo="categoría" items={categorias} onCrear={(d)=>operarEntidad(crearCategoria,d)} onEditar={(id,d)=>operarEntidad(actualizarCategoria,id,d)} onEliminar={(id)=>operarEntidad(eliminarCategoria,id)}/>}
    </section>
    {formAbierto&&<AdminMotoForm moto={motoEditando} marcas={marcas} categorias={categorias} guardando={guardando} onGuardar={guardar} onCancelar={()=>{setFormAbierto(false);setMotoEditando(null);}}/>}
  </main>;
}
export default AdminDashboardPage;
