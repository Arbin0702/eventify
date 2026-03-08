import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMobileOpen(false);
  }

  function closeAll() {
    setMobileOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
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