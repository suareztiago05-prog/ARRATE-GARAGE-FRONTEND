import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/hero/Hero";
import MotoGrid from "../components/MotoGrid/MotoGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterButtons from "../components/FilterButtons/FilterButtons";
import SortSelect from "../components/SortSelect/SortSelect";
import FinancingSection from "../components/FinancingSection/FinancingSection";
import Footer from "../components/Footer/Footer";
import { obtenerMotos } from "../services/moto.service";
import { obtenerMarcas } from "../services/marca.service";
import { obtenerCategorias } from "../services/categoria.service";

function HomePage() {
const [motos, setMotos] = useState([]);
const [marcas, setMarcas] = useState([]);
const [categorias, setCategorias] = useState([]);

const [busqueda, setBusqueda] = useState("");
const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
const [orden, setOrden] = useState("recientes");

const [cargando, setCargando] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
// eslint-disable-next-line react-hooks/immutability
cargarDatos();
}, []);

const cargarDatos = async () => {
try {
    setCargando(true);
    setError("");

    const [respuestaMotos, respuestaMarcas, respuestaCategorias] =
    await Promise.all([
        obtenerMotos(),
        obtenerMarcas(),
        obtenerCategorias(),
    ]);

    setMotos(respuestaMotos.data || []);
    setMarcas(respuestaMarcas.data || []);
    setCategorias(respuestaCategorias.data || []);
} catch (error) {
    console.error("Error al cargar los datos:", error);

    setError(
    "No se pudieron cargar los datos. Verificá que el backend esté funcionando.",
    );
} finally {
    setCargando(false);
}
};

const motosFiltradasYOrdenadas = useMemo(() => {
const textoBusqueda = busqueda.trim().toLowerCase();

const resultado = motos.filter((moto) => {
    const nombre = moto.nombre?.toLowerCase() || "";
    const marca = moto.marca?.nombre?.toLowerCase() || "";
    const categoria = moto.categoria?.nombre?.toLowerCase() || "";
    const cilindrada = String(moto.cilindrada || "").toLowerCase();

    const coincideBusqueda =
    !textoBusqueda ||
    nombre.includes(textoBusqueda) ||
    marca.includes(textoBusqueda) ||
    categoria.includes(textoBusqueda) ||
    cilindrada.includes(textoBusqueda);

    const coincideMarca =
    !marcaSeleccionada || moto.marca?.nombre === marcaSeleccionada;

    const coincideCategoria =
    !categoriaSeleccionada ||
    moto.categoria?.nombre === categoriaSeleccionada;

    return coincideBusqueda && coincideMarca && coincideCategoria;
});

return [...resultado].sort((motoA, motoB) => {
    switch (orden) {
    case "precio-asc":
        return Number(motoA.precio || 0) - Number(motoB.precio || 0);

    case "precio-desc":
        return Number(motoB.precio || 0) - Number(motoA.precio || 0);

    case "cilindrada-asc":
        return (
        Number(motoA.cilindrada || 0) -
        Number(motoB.cilindrada || 0)
        );

    case "cilindrada-desc":
        return (
        Number(motoB.cilindrada || 0) -
        Number(motoA.cilindrada || 0)
        );

    case "nombre-asc":
        return (motoA.nombre || "").localeCompare(
        motoB.nombre || "",
        "es",
        );

    case "nombre-desc":
        return (motoB.nombre || "").localeCompare(
        motoA.nombre || "",
        "es",
        );

    case "recientes":
    default:
        return (
        new Date(motoB.createdAt || 0) -
        new Date(motoA.createdAt || 0)
        );
    }
});
}, [
motos,
busqueda,
marcaSeleccionada,
categoriaSeleccionada,
orden,
]);

return (
<>
    <Navbar />

    <main>
    <Hero />

    <section id="catalogo" className="catalogo">
        <div className="catalogo__container">
        <div className="catalogo__encabezado">
            <div className="catalogo__presentacion">
            <span className="catalogo__tag">Nuestro stock</span>

            <h2>Encontrá tu próxima moto</h2>

            <p className="catalogo__descripcion">
                Buscá por nombre, marca, categoría o cilindrada y descubrí
                los modelos disponibles en Arrate Motos.
            </p>

            {!cargando && !error && (
                <p className="catalogo__cantidad">
                {motosFiltradasYOrdenadas.length}{" "}
                {motosFiltradasYOrdenadas.length === 1
                    ? "moto encontrada"
                    : "motos encontradas"}
                </p>
            )}
            </div>

            <div className="catalogo__herramientas">
            <SearchBar
                busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
            />

            <SortSelect
                orden={orden}
                onCambiarOrden={setOrden}
            />
            </div>
        </div>

        {!cargando && !error && (
            <div className="catalogo__filtros">
            <FilterButtons
                titulo="Marca"
                items={marcas}
                valorSeleccionado={marcaSeleccionada}
                onSeleccionar={setMarcaSeleccionada}
            />

            <FilterButtons
                titulo="Categoría"
                items={categorias}
                valorSeleccionado={categoriaSeleccionada}
                onSeleccionar={setCategoriaSeleccionada}
            />
            </div>
        )}

        {!cargando &&
        !error &&
        motosFiltradasYOrdenadas.length === 0 ? (
            <div className="catalogo__sin-resultados">
            <i className="bi bi-search"></i>
            <h3>No encontramos motos</h3>
            <p>
                Probá modificando la búsqueda o seleccionando otros filtros.
            </p>
            </div>
        ) : (
            <MotoGrid
            motos={motosFiltradasYOrdenadas}
            cargando={cargando}
            error={error}
            />
        )}
        </div>
    </section>

    <FinancingSection motos={motos} />
    </main>

    <Footer />
</>
);
}

export default HomePage;
