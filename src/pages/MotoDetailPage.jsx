import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos,
} from "../services/favorito.service";
import { obtenerMotoPorId } from "../services/moto.service";
import { obtenerToken } from "../utils/auth";
import { formatPrice } from "../utils/formatPrice";
import "./MotoDetailPage.css";
import "./MotoDetailFavorite.css";

const WHATSAPP = "5492235896986";

function MotoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moto, setMoto] = useState(null);
  const [imagen, setImagen] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [favorita, setFavorita] = useState(false);

  useEffect(() => {
    obtenerMotoPorId(id)
      .then((respuesta) => setMoto(respuesta.data))
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "No pudimos cargar esta moto.",
        ),
      )
      .finally(() => setCargando(false));
  }, [id]);

  useEffect(() => {
    if (!obtenerToken()) return;

    obtenerFavoritos()
      .then((respuesta) =>
        setFavorita((respuesta.data || []).some((item) => item._id === id)),
      )
      .catch(() => setFavorita(false));
  }, [id]);

  const alternarFavorito = async () => {
    if (!obtenerToken()) {
      navigate(`/login?redirect=${encodeURIComponent(`/motos/${id}`)}`);
      return;
    }

    try {
      if (favorita) {
        await eliminarFavorito(id);
      } else {
        await agregarFavorito(id);
      }

      setFavorita((estado) => !estado);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "No pudimos actualizar tus favoritos.",
      );
    }
  };

  if (cargando) {
    return <div className="moto-detail__state">Cargando detalle...</div>;
  }

  if (error || !moto) {
    return (
      <div className="moto-detail__state">
        <h1>Moto no encontrada</h1>
        <p>{error}</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  const imagenes = moto.imagenes?.length
    ? moto.imagenes
    : [
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1400&q=85",
      ];
  const mensaje = encodeURIComponent(
    `Hola, quiero consultar por la ${moto.marca?.nombre || ""} ${moto.nombre}.`,
  );

  return (
    <>
      <Navbar />
      <main className="moto-detail">
        <div className="moto-detail__container">
          <Link to="/#catalogo" className="moto-detail__back">
            <i className="bi bi-arrow-left" /> Volver al catálogo
          </Link>

          <div className="moto-detail__layout">
            <section className="moto-detail__gallery">
              <img src={imagenes[imagen]} alt={moto.nombre} />
              {imagenes.length > 1 && (
                <div className="moto-detail__thumbs">
                  {imagenes.map((url, index) => (
                    <button
                      key={url}
                      type="button"
                      className={imagen === index ? "active" : ""}
                      onClick={() => setImagen(index)}
                    >
                      <img src={url} alt={`${moto.nombre} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="moto-detail__info">
              <span className="moto-detail__brand">{moto.marca?.nombre}</span>
              <h1>{moto.nombre}</h1>
              <p className="moto-detail__category">{moto.categoria?.nombre}</p>
              <strong className="moto-detail__price">
                {formatPrice(moto.precio, moto.moneda)}
              </strong>

              <div className="moto-detail__specs">
                <article>
                  <span>Cilindrada</span>
                  <strong>
                    {moto.cilindrada ? `${moto.cilindrada} cc` : "Eléctrica"}
                  </strong>
                </article>
                <article>
                  <span>Estado</span>
                  <strong>
                    {moto.disponible !== false ? "Disponible" : "No disponible"}
                  </strong>
                </article>
              </div>

              <div className="moto-detail__description">
                <h2>Descripción</h2>
                <p>{moto.descripcion}</p>
              </div>

              <div className="moto-detail__actions">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${mensaje}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-whatsapp" /> Consultar por WhatsApp
                </a>
                <Link to="/#financiacion">Solicitar financiación</Link>
                <button
                  type="button"
                  className={favorita ? "is-active" : ""}
                  onClick={alternarFavorito}
                >
                  <i className={favorita ? "bi bi-heart-fill" : "bi bi-heart"} />
                  {favorita ? "Quitar de favoritos" : "Guardar en favoritos"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MotoDetailPage;
