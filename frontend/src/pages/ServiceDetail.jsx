import { Link, useParams } from "react-router-dom";
import { getServiceBySlug } from "../data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="container" style={{ paddingTop: 16 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Service not found</h2>
          <Link className="btn" to="/services" style={{ textDecoration: "none" }}>
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="hero heroBig">
        <div className="badge">SERVICE</div>
        <h1 style={{ marginTop: 12 }}>{service.title}</h1>
        <p style={{ marginTop: 10 }}>{service.hero}</p>

        <div className="row" style={{ marginTop: 14 }}>
          <Link className="btn ghost" to="/services" style={{ textDecoration: "none" }}>
            ← Back
          </Link>
          <Link className="btn primary" to="/contact" style={{ textDecoration: "none" }}>
            Get a Quote
          </Link>
          <Link className="btn" to="/work" style={{ textDecoration: "none" }}>
            View Work
          </Link>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>What you get</h3>
          <ul className="list">
            {service.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>How we approach it</h3>
          {service.details.map((p) => (
            <p key={p} className="muted" style={{ marginTop: 10, lineHeight: 1.7 }}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="cta" style={{ marginTop: 16 }}>
        <div>
          <h2 style={{ margin: 0 }}>Want {service.title.toLowerCase()} like this?</h2>
          <p className="muted" style={{ margin: "8px 0 0 0" }}>
            Send your timeline and location — we’ll reply with a simple plan.
          </p>
        </div>
        <div className="row">
          <Link className="btn primary" to="/contact" style={{ textDecoration: "none" }}>
            Contact
          </Link>
          <Link className="btn" to="/events" style={{ textDecoration: "none" }}>
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}