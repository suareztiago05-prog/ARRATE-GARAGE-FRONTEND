import { useState } from "react";
import "./FinancingSection.css";

const estadoInicial = {
dni: "",
nombreCompleto: "",
telefono: "",
localidad: "",
sucursal: "",
anticipo: "",
moneda: "ARS",
moto: "",
};

function FinancingSection({ motos = [] }) {
const [formulario, setFormulario] = useState(estadoInicial);
const [enviado, setEnviado] = useState(false);

const manejarCambio = (event) => {
const { name, value } = event.target;

setFormulario((estadoAnterior) => ({
    ...estadoAnterior,
    [name]: value,
}));

setEnviado(false);
};

const manejarEnvio = (event) => {
event.preventDefault();

const motoSeleccionada =
    motos.find((moto) => moto._id === formulario.moto) || null;

const nombreMoto = motoSeleccionada
    ? `${motoSeleccionada.marca?.nombre || ""} ${
        motoSeleccionada.nombre || ""
    }`.trim()
    : "Sin modelo específico";

const mensaje = `
Hola, quiero solicitar información sobre financiación.

Datos personales:
- DNI: ${formulario.dni}
- Nombre y apellido: ${formulario.nombreCompleto}
- Teléfono: ${formulario.telefono}
- Localidad: ${formulario.localidad}

Solicitud:
- Sucursal elegida: ${formulario.sucursal}
- Moto de interés: ${nombreMoto}
- Anticipo disponible: ${formulario.moneda} ${formulario.anticipo || "0"}

Quedo a la espera de que un asesor se comunique conmigo.
`.trim();

const numeroWhatsApp = "5492230000000";

const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje,
)}`;

setEnviado(true);
window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
};

return (
<section id="financiacion" className="financing">
    <div className="financing__container">
    <div className="financing__heading">
        <span className="financing__tag">
        <i className="bi bi-credit-card-2-front"></i>
        Financiación
        </span>

        <h2>
        Dejanos tus datos.
        <span> Te respondemos en el día.</span>
        </h2>

        <p>
        Completá el formulario y un asesor comercial te contactará para
        ayudarte a encontrar el plan más conveniente.
        </p>
    </div>

    <div className="financing__layout">
        <form className="financing__form" onSubmit={manejarEnvio}>
        <div className="financing__form-grid">
            <div className="financing__field">
            <label htmlFor="dni">
                DNI <span>*</span>
            </label>

            <input
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 12345678"
                value={formulario.dni}
                onChange={manejarCambio}
                required
                minLength={7}
                maxLength={10}
            />
            </div>

            <div className="financing__field">
            <label htmlFor="nombreCompleto">
                Nombre y apellido <span>*</span>
            </label>

            <input
                id="nombreCompleto"
                name="nombreCompleto"
                type="text"
                placeholder="Tu nombre completo"
                value={formulario.nombreCompleto}
                onChange={manejarCambio}
                required
                minLength={3}
            />
            </div>

            <div className="financing__field">
            <label htmlFor="telefono">
                Número de teléfono <span>*</span>
            </label>

            <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+54 9 223..."
                value={formulario.telefono}
                onChange={manejarCambio}
                required
            />
            </div>

            <div className="financing__field">
            <label htmlFor="localidad">
                Localidad <span>*</span>
            </label>

            <input
                id="localidad"
                name="localidad"
                type="text"
                placeholder="Ej: Mar del Plata"
                value={formulario.localidad}
                onChange={manejarCambio}
                required
            />
            </div>

            <div className="financing__field">
            <label htmlFor="sucursal">
                Sucursal más cómoda <span>*</span>
            </label>

            <select
                id="sucursal"
                name="sucursal"
                value={formulario.sucursal}
                onChange={manejarCambio}
                required
            >
                <option value="">Seleccioná una sucursal</option>
                <option value="Mar del Plata">Mar del Plata</option>
                <option value="Otra sucursal">Otra sucursal</option>
            </select>
            </div>

            <div className="financing__field">
            <label htmlFor="moto">
                Moto de interés <span>*</span>
            </label>

            <select
                id="moto"
                name="moto"
                value={formulario.moto}
                onChange={manejarCambio}
                required
            >
                <option value="">Seleccioná una moto</option>

                {motos.map((moto) => (
                <option key={moto._id} value={moto._id}>
                    {moto.marca?.nombre || ""} {moto.nombre}
                </option>
                ))}
            </select>
            </div>

            <div className="financing__field financing__field--advance">
            <label htmlFor="anticipo">¿Contás con anticipo?</label>

            <div className="financing__advance">
                <input
                id="anticipo"
                name="anticipo"
                type="number"
                min="0"
                placeholder="Ej: 1.000.000"
                value={formulario.anticipo}
                onChange={manejarCambio}
                />

                <select
                name="moneda"
                aria-label="Moneda"
                value={formulario.moneda}
                onChange={manejarCambio}
                >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
                </select>
            </div>
            </div>
        </div>

        <div className="financing__form-footer">
            <button type="submit" className="financing__submit">
            Solicitar financiación
            <i className="bi bi-arrow-up-right"></i>
            </button>

            <p>
            <i className="bi bi-shield-check"></i>
            Tus datos se utilizarán únicamente para responder tu consulta.
            </p>
        </div>

        {enviado && (
            <div className="financing__success">
            <i className="bi bi-check-circle-fill"></i>

            <div>
                <strong>Solicitud preparada correctamente</strong>
                <span>
                Se abrió WhatsApp con todos los datos del formulario.
                </span>
            </div>
            </div>
        )}
        </form>

        <aside className="financing__information">
        <article className="financing__info-card">
            <span className="financing__info-label">Opciones disponibles</span>

            <div className="financing__info-icon">
            <i className="bi bi-person-vcard"></i>
            </div>

            <h3>Consultá solamente con tu DNI</h3>

            <p>
            Un asesor revisará tu solicitud y te explicará las alternativas
            disponibles.
            </p>
        </article>

        <article className="financing__info-card">
            <span className="financing__info-label">
            Respuesta personalizada
            </span>

            <div className="financing__info-icon">
            <i className="bi bi-clock-history"></i>
            </div>

            <h3>Te contactamos en el día</h3>

            <p>
            Analizamos tus datos y buscamos una opción que se adapte a tu
            presupuesto.
            </p>
        </article>

        <article className="financing__info-card financing__info-card--dark">
            <span className="financing__info-label">
            Atención comercial
            </span>

            <h3>¿Preferís hablar directamente?</h3>

            <p>
            Escribinos por WhatsApp y consultá con un asesor de Arrate
            Motos.
            </p>

            <a
            href="https://wa.me/5492230000000"
            target="_blank"
            rel="noreferrer"
            >
            <i className="bi bi-whatsapp"></i>
            Hablar por WhatsApp
            </a>
        </article>
        </aside>
    </div>
    </div>
</section>
);
}

export default FinancingSection;