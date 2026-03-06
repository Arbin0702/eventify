import { Link } from "react-router-dom";
import { SERVICES } from "../data/services";
import { getCategoryImage, SITE_IMAGES } from "../data/siteImages";
import Reveal from "../components/RevealComponent";

function ServiceCard({ s }) {
  return (
    <div className="serviceFriendlyCard">
      <div className="serviceFriendlyImage">
        <img src={getCategoryImage(s.title.includes("Corporate") ? "Corporate" : s.title.includes("Community") ? "Community" : s.title.includes("Exhibitions") ? "Exhibitions" : s.title.includes("Logistics") ? "Logistics" : "Activations")} alt={s.title} />
      </div>

      <div className="serviceFriendlyBody">
        <span className="badge">{s.title}</span>
        <h3>{s.title}</h3>
        <p>{s.hero}</p>

        <ul className="list">
          {s.bullets.slice(0, 3).map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div style={{ marginTop: 14 }}>
          <Link className="btn primary" to={`/services/${s.slug}`} style={{ textDecoration: "none" }}>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Reveal>
        <section className="heroFriendly smallHero">
          <div className="heroFriendlyContent">
            <span className="badge">Services</span>
            <h1>Event services designed to feel professional and memorable</h1>
            <p>
              From brand activations to logistics, each service page now feels more visual, polished and easy to understand.
            </p>
            <div className="row" style={{ marginTop: 14 }}>
              <Link className="btn primary" to="/contact" style={{ textDecoration: "none" }}>
                Get a Quote
              </Link>
              <Link className="btn" to="/work" style={{ textDecoration: "none" }}>
                View Our Work
              </Link>
            </div>
          </div>

          <div className="heroFriendlyImage">
            <img src={SITE_IMAGES.services} alt="Event service visual" />
          </div>
        </section>
      </Reveal>

      <div className="friendlyGrid2" style={{ marginTop: 18 }}>
        {SERVICES.map((s) => (
          <Reveal key={s.slug}>
            <ServiceCard s={s} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}