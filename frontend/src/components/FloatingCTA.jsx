import { Link } from "react-router-dom";

export default function FloatingCTA() {
  return (
    <Link to="/contact" className="floatingCta" style={{ textDecoration: "none" }}>
      <span className="floatingIcon">✨</span>
      <span>Request Quote</span>
    </Link>
  );
}