import ktmLogo from "../../assets/partners/ktm.png";
import canAmLogo from "../../assets/partners/canam.jpg";
import seaDooLogo from "../../assets/partners/seadoo.jpg";
import yamahaLogo from "../../assets/partners/yamaha.png";
import benelliLogo from "../../assets/partners/benelli.png";
import suzukiLogo from "../../assets/partners/suzuki.png";
import tvsLogo from "../../assets/partners/tvs.png";
import betaLogo from "../../assets/partners/beta.png";
import zontesLogo from "../../assets/partners/zontes.jpg";
import motomelLogo from "../../assets/partners/motomel.png";
import symLogo from "../../assets/partners/sym.png";
import teknialLogo from "../../assets/partners/teknial.png";
import kellerLogo from "../../assets/partners/keller.png";
import ls2Logo from "../../assets/partners/ls2.png";
import alpinestarsLogo from "../../assets/partners/alpinestars.png";
import "./StrategicPartners.css";

const partners = [
  { name: "KTM", logo: ktmLogo },
  { name: "Can-Am", logo: canAmLogo },
  { name: "Sea-Doo", logo: seaDooLogo },
  { name: "Yamaha", logo: yamahaLogo },
  { name: "Benelli", logo: benelliLogo },
  { name: "Suzuki", logo: suzukiLogo },
  { name: "TVS", logo: tvsLogo },
  { name: "Beta", logo: betaLogo },
  { name: "Zontes", logo: zontesLogo },
  { name: "Motomel", logo: motomelLogo },
  { name: "SYM", logo: symLogo },
  { name: "Teknial", logo: teknialLogo },
  { name: "Keller", logo: kellerLogo },
  { name: "LS2", logo: ls2Logo },
  { name: "Alpinestars", logo: alpinestarsLogo },
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
