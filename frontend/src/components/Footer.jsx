import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div style={{ marginTop: 26 }}>
      <div className="container">
        <div className="footer panel padded">
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Eventify</div>
            <div className="muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
              Modern event production style website + booking system.
            </div>
          </div>

          <div className="footerCols">
            <div>
              <div className="footerTitle">Company</div>
              <Link className="footerLink" to="/">Home</Link>
              <Link className="footerLink" to="/services">Services</Link>
              <Link className="footerLink" to="/work">Work</Link>
              <Link className="footerLink" to="/contact">Contact</Link>
            </div>

            <div>
              <div className="footerTitle">Platform</div>
              <Link className="footerLink" to="/events">Events</Link>
              <Link className="footerLink" to="/dashboard">Dashboard</Link>
              <Link className="footerLink" to="/profile">Profile</Link>
            </div>

            <div>
              <div className="footerTitle">Legal</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
                This is a student demo project. Replace with real legal pages for production.
              </div>
            </div>
          </div>
        </div>

        <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
          © {year} Eventify. All rights reserved.
        </div>
      </div>
    </div>
  );
}