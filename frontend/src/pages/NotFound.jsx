import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="hero">
        <h1>404 — Not Found</h1>
        <p>The page you’re looking for doesn’t exist.</p>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <Link className="btn primary" to="/events" style={{ textDecoration: "none" }}>
          Go to Events
        </Link>
      </div>
    </div>
  );
}