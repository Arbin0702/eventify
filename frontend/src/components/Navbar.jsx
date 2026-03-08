import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const navRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMobileOpen(false);
    setAdminOpen(false);
  }

  function closeAll() {
    setMobileOpen(false);
    setAdminOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
        setAdminOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setAdminOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      <div className="container">
        <div className="megaNavRow">
          <Link className="brand" to="/" onClick={closeAll}>
            Eventify
          </Link>

          <button
            className="mobileMenuBtn"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          <div className={`megaNavLinks ${mobileOpen ? "mobileOpen" : ""}`}>
            <Link className="link" to="/" onClick={closeAll}>
              Home
            </Link>

            <Link className="link" to="/events" onClick={closeAll}>
              Events
            </Link>

            <Link className="link" to="/work" onClick={closeAll}>
              Work
            </Link>

            <Link className="link" to="/contact" onClick={closeAll}>
              Contact
            </Link>

            {token && (
              <>
                <Link className="link" to="/dashboard" onClick={closeAll}>
                  My Bookings
                </Link>

                <Link className="link" to="/profile" onClick={closeAll}>
                  Profile
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <div style={{ position: "relative" }}>
                <button
                  className="btn ghost"
                  type="button"
                  onClick={() => setAdminOpen((v) => !v)}
                  style={{ marginLeft: 8 }}
                >
                  Admin ▾
                </button>

                {adminOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "110%",
                      right: 0,
                      minWidth: 180,
                      background: "#1e2235",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      padding: 10,
                      display: "grid",
                      gap: 8,
                      zIndex: 50
                    }}
                  >
                    <Link className="link" to="/admin/inbox" onClick={closeAll}>
                      Inbox
                    </Link>
                    <Link className="link" to="/admin/portfolio" onClick={closeAll}>
                      Portfolio
                    </Link>
                    <Link className="link" to="/admin/bookings" onClick={closeAll}>
                      Bookings
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="megaNavRight desktopOnlyNavActions">
            <ThemeToggle />

            {!token ? (
              <>
                <Link className="btn ghost" to="/login">
                  Login
                </Link>

                <Link className="btn primary" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <>
                {user?.name && (
                  <span className="muted" style={{ marginRight: 12 }}>
                    Hi, {user.name}
                  </span>
                )}

                {user?.role === "admin" && (
                  <Link
                    className="btn primary"
                    to="/create-event"
                    style={{ textDecoration: "none", marginRight: 12 }}
                  >
                    Create Event
                  </Link>
                )}

                <button className="btn ghost" onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}