import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import MotoGrid from "../components/MotoGrid/MotoGrid";
import Navbar from "../components/Navbar/Navbar";
import {
  eliminarFavorito,
  obtenerFavoritos,
} from "../services/favorito.service";
import "./FavoritesPage.css";

function FavoritesPage() {
  const [motos, setMotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerFavoritos()
      .then((respuesta) => setMotos(respuesta.data || []))
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "No pudimos cargar tus favoritos.",
        ),
      )
      .finally(() => setCargando(false));
  }, []);

  const quitarFavorito = async (moto) => {
    try {
      const respuesta = await eliminarFavorito(moto._id);
      setMotos(respuesta.data || []);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "No pudimos quitar la moto de favoritos.",
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="favorites-page">
        <div className="favorites-page__container">
          <span className="favorites-page__tag">Tu selección</span>
          <h1>Mis favoritos</h1>
          <p>Guardá las motos que te interesan para compararlas más adelante.</p>

          {!cargando && !error && motos.length === 0 ? (
            <div className="favorites-page__empty">
              <i className="bi bi-heart"></i>
              <h2>Todavía no guardaste ninguna moto</h2>
              <a href="/#catalogo">Explorar el catálogo</a>
            </div>
          ) : (
            <MotoGrid
              motos={motos}
              cargando={cargando}
              error={error}
              favoritos={motos.map((moto) => moto._id)}
              onAlternarFavorito={quitarFavorito}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavoritesPage;
