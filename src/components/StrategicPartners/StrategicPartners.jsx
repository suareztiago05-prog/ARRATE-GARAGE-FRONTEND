import yamahaLogo from "../../assets/partners/yamaha.png";
import suzukiLogo from "../../assets/partners/suzuki.png";
import benelliLogo from "../../assets/partners/benelli.png";
import zontesLogo from "../../assets/partners/zontes.jpg";
import betaLogo from "../../assets/partners/beta.png";
import motomelLogo from "../../assets/partners/motomel.png";
import tvsLogo from "../../assets/partners/tvs.png";
import "./StrategicPartners.css";

const partners = [
  { name: "Yamaha", logo: yamahaLogo },
  { name: "Suzuki", logo: suzukiLogo },
  { name: "Benelli", logo: benelliLogo },
  { name: "Zontes", logo: zontesLogo },
  { name: "Beta", logo: betaLogo },
  { name: "Motomel", logo: motomelLogo },
  { name: "TVS", logo: tvsLogo },
];

function StrategicPartners() {
  return (
    <section className="strategic-partners" aria-labelledby="partners-title">
      <div className="strategic-partners__container">
        <div className="strategic-partners__heading">
          <p>Marcas que nos acompañan</p>
          <h2 id="partners-title">Socios estratégicos</h2>
        </div>

        <div className="strategic-partners__logos">
          {partners.map((partner) => (
            <div className="strategic-partners__item" key={partner.name}>
              <img
                src={partner.logo}
                alt={`Logo de ${partner.name}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StrategicPartners;
