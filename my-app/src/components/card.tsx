import "./style/Card.css";
import logoTeam from "../../public/logoTeam.png";
import { Globe } from "lucide-react";
import { Map } from "lucide-react";
import { Phone } from "lucide-react";

type CardProps = {
  title: string;
  text: string;
};

export default function Card({ title, text }: CardProps) {
  return (
    <div className="card pointer levitate glass">
      <div className="logo-container">
        <img
          src={logoTeam}
          alt="LogoTeam"
          style={{ width: "150px", height: "auto" }}
        />
      </div>

      <h2>{title}</h2>
      <p>{text}</p>
      <hr></hr>
      <div className="stats-container">
        <div className="stat-block">
          <div className="stat-number">10+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-block">
          <div className="stat-number">500+</div>
          <div className="stat-label">Healthcare Clients</div>
        </div>
      </div>
      <div className="contats-container">
        <div className="contact">
          <Globe style={{ color: "rgb(17, 25, 40)" }} />
          <a href="https://kelyon.com/it/">check our WebSite!</a>
        </div>
        <div className="contact">
          <Phone style={{ color: "rgb(17, 25, 40)" }}></Phone>
          <a href="tel:+39 081 1902 7127">081 1902 7127</a>
        </div>
        <div className="contact">
          <Map style={{ color: "rgb(17, 25, 40)" }}></Map>
          <a href="https://www.google.com/maps/place/Kelyon+S.r.l./@40.8479573,14.2781755,17z/data=!3m1!4b1!4m6!3m5!1s0x133ba793b63138d7:0x5ab8649ff4c1c33!8m2!3d40.8479574!4d14.2830464!16s%2Fg%2F1tjgxmtm?entry=ttu&g_ep=EgoyMDI1MDYyNi4wIKXMDSoASAFQAw%3D%3D">
            We are here!
          </a>
        </div>
      </div>
    </div>
  );
}
