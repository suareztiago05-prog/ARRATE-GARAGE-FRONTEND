import { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero/Hero";
import MotoGrid from "../components/MotoGrid/MotoGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import { obtenerMotos } from "../services/moto.service";

function HomePage() {
const [motos, setMotos] = useState([]);
const [busqueda, setBusqueda] = useState("");
const [cargando, setCargando] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
cargarMotos();
}, []);

const cargarMotos = async () => {
try {
    setCargando(true);
    setError("");

    const respuesta = await obtenerMotos();

    setMotos(respuesta.data || []);
} catch (error) {
    console.error("Error al cargar las motos:", error);

    setError(
    "No se pudieron cargar las motos. Verificá que el backend esté funcionando.",
    );
} finally {
    setCargando(false);
}
};

const motosFiltradas = useMemo(() => {
const textoBusqueda = busqueda.trim().toLowerCase();

if (!textoBusqueda) {
    return motos;
}

return motos.filter((moto) => {
    const nombre = moto.nombre?.toLowerCase() || "";
    const marca = moto.marca?.nombre?.toLowerCase() || "";
    const categoria = moto.categoria?.nombre?.toLowerCase() || "";
    const cilindrada = String(moto.cilindrada || "").toLowerCase();

    return (
    nombre.includes(textoBusqueda) ||
    marca.includes(textoBusqueda) ||
    categoria.includes(textoBusqueda) ||
    cilindrada.includes(textoBusqueda)
    );
});
}, [motos, busqueda]);

return (
<main>
    <Hero />

    <section id="catalogo" className="catalogo">
    <div className="catalogo__encabezado">
        <div>
        <span className="catalogo__tag">Nuestro stock</span>
        <h2>Catálogo de motos</h2>

        {!cargando && !error && (
            <p className="catalogo__cantidad">
            {motosFiltradas.length}{" "}
            {motosFiltradas.length === 1
                ? "moto encontrada"
                : "motos encontradas"}
            </p>
        )}
        </div>

        <SearchBar
        busqueda={busqueda}
        onCambiarBusqueda={setBusqueda}
        />
    </div>

    <MotoGrid
        motos={motosFiltradas}
        cargando={cargando}
        error={error}
    />
    </section>
</main>
);
}

export default HomePage;