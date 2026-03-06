import { Link, useParams } from "react-router-dom";
import { getWorkBySlug } from "../data/work";

export default function WorkDetail() {
  const { slug } = useParams();
  const item = getWorkBySlug(slug);

  if (!item) {
    return (
      <div className="container" style={{ paddingTop: 16 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Work not found</h2>
          <Link className="btn" to="/work" style={{ textDecoration: "none" }}>
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="panel padded spread">
        <Link className="btn ghost" to="/work" style={{ textDecoration: "none" }}>
          ← Back
        </Link>
        <Link className="btn primary" to="/contact" style={{ textDecoration: "none" }}>
          Get a Quote
        </Link>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="workHeroThumb" aria-hidden="true" />

        <div className="row" style={{ marginTop: 14 }}>
          <span className="badge">{item.tag}</span>
          <span className="badge">📍 {item.location}</span>
          <span className="badge">📈 {item.outcome}</span>
        </div>

        <h2 style={{ marginTop: 12 }}>{item.title}</h2>
        <p className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
          {item.summary}
        </p>

        <div className="divider" style={{ marginTop: 14 }} />

        <div className="grid2" style={{ marginTop: 14 }}>
          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ marginTop: 0 }}>What we did</h3>
            <ul className="list">
              <li>Planning + run sheet + supplier coordination</li>
              <li>On-site operations + timing control</li>
              <li>Experience design + attendee flow</li>
              <li>Content moments + post-event wrap</li>
            </ul>
          </div>

          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ marginTop: 0 }}>Outcome</h3>
            <p className="muted" style={{ lineHeight: 1.7 }}>
              We kept delivery smooth and built several “camera-ready” moments that helped amplify reach.
              The result was measurable engagement and strong attendee feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}