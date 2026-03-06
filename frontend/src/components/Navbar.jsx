import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMobileOpen(false);
    setOpenMenu("");
  }

  function toggle(menu) {
    setOpenMenu((prev) => (prev === menu ? "" : menu));
  }

  function closeAll() {
    setOpenMenu("");
    setMobileOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu("");
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setOpenMenu("");
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

            {/* SERVICES */}
            <div className="megaMenuWrap">
              <button
                className={`megaMenuBtn ${openMenu === "services" ? "active" : ""}`}
                onClick={() => toggle("services")}
                type="button"
              >
                Services ▾
              </button>

              <div className={`megaMenuPanel ${openMenu === "services" ? "showPanel" : ""}`}>
                <div className="megaMenuGrid">
                  <div>
                    <div className="megaMenuTitle">Popular Services</div>

                    <Link className="megaMenuItem" to="/services" onClick={closeAll}>
                      <strong>All Services</strong>
                      <span>See the full list of event production services.</span>
                    </Link>

                    <Link className="megaMenuItem" to="/services/brand-activations" onClick={closeAll}>
                      <strong>Brand Activations</strong>
                      <span>Interactive experiences that engage customers.</span>
                    </Link>

                    <Link className="megaMenuItem" to="/services/corporate-events" onClick={closeAll}>
                      <strong>Corporate Events</strong>
                      <span>Professional launches, conferences and dinners.</span>
                    </Link>
                  </div>

                  <div>
                    <div className="megaMenuTitle">More Categories</div>

                    <Link className="megaMenuItem" to="/services/community-events" onClick={closeAll}>
                      <strong>Community Events</strong>
                      <span>Family days, festivals and local engagement programs.</span>
                    </Link>

                    <Link className="megaMenuItem" to="/services/exhibitions-trade-shows" onClick={closeAll}>
                      <strong>Exhibitions</strong>
                      <span>Trade shows, expo booths and visitor flow planning.</span>
                    </Link>

                    <Link className="megaMenuItem" to="/services/event-logistics" onClick={closeAll}>
                      <strong>Event Logistics</strong>
                      <span>Planning, setup, timing and operational coordination.</span>
                    </Link>
                  </div>

                  <div className="megaFeatureCard">
                    <img
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
                      alt="Event services"
                    />
                    <div className="megaFeatureBody">
                      <div className="megaMenuTitle">Featured</div>
                      <h4>Plan events that feel premium</h4>
                      <p>
                        Explore creative concepts, production support and polished event delivery.
                      </p>
                      <Link className="btn primary" to="/services" onClick={closeAll}>
                        Explore Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EVENTS */}
            <div className="megaMenuWrap rightAlign">
              <button
                className={`megaMenuBtn ${openMenu === "events" ? "active" : ""}`}
                onClick={() => toggle("events")}
                type="button"
              >
                Events ▾
              </button>

              <div className={`megaMenuPanel smallPanel ${openMenu === "events" ? "showPanel" : ""}`}>
                <div className="megaSimpleMenu">
                  <Link to="/events" onClick={closeAll}>
                    Browse Events
                  </Link>
                  {user?.role === "admin" && (
                    <Link to="/create-event" onClick={closeAll}>
                      Create Event
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <Link className="link" to="/work" onClick={closeAll}>
              Work
            </Link>

            <Link className="link" to="/contact" onClick={closeAll}>
              Contact
            </Link>

            {token && (
              <div className="megaMenuWrap rightAlign">
                <button
                  className={`megaMenuBtn ${openMenu === "dashboard" ? "active" : ""}`}
                  onClick={() => toggle("dashboard")}
                  type="button"
                >
                  Dashboard ▾
                </button>

                <div className={`megaMenuPanel smallPanel ${openMenu === "dashboard" ? "showPanel" : ""}`}>
                  <div className="megaSimpleMenu">
                    <Link to="/dashboard" onClick={closeAll}>
                      My Bookings
                    </Link>
                    <Link to="/profile" onClick={closeAll}>
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {user?.role === "admin" && (
              <div className="megaMenuWrap rightAlign">
                <button
                  className={`megaMenuBtn ${openMenu === "admin" ? "active" : ""}`}
                  onClick={() => toggle("admin")}
                  type="button"
                >
                  Admin ▾
                </button>

                <div className={`megaMenuPanel smallPanel ${openMenu === "admin" ? "showPanel" : ""}`}>
                  <div className="megaSimpleMenu">
                    <Link to="/admin/inbox" onClick={closeAll}>
                      Inbox
                    </Link>
                    <Link to="/admin/portfolio" onClick={closeAll}>
                      Portfolio
                    </Link>
                    <Link to="/admin/bookings" onClick={closeAll}>
                      Bookings
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mobileOnlyNavActions">
              <ThemeToggle />

              {!token ? (
                <div className="row">
                  <Link className="btn ghost" to="/login" onClick={closeAll}>
                    Login
                  </Link>
                  <Link className="btn primary" to="/register" onClick={closeAll}>
                    Register
                  </Link>
                </div>
              ) : (
                <button className="btn ghost" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
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
              <button className="btn ghost" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}