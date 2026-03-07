import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Reveal from "../components/RevealComponent";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState("");
  const [locationFilter, setLocationFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const backend = "https://eventify-vrrg.onrender.com";
  const user = JSON.parse(localStorage.getItem("user") || "null");

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to load events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const locations = useMemo(() => {
    const set = new Set(events.map((e) => e.location).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [events]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return events.filter((e) => {
      const matchText =
        !query ||
        e.title?.toLowerCase().includes(query) ||
        e.location?.toLowerCase().includes(query);

      const matchLocation =
        locationFilter === "ALL" || e.location === locationFilter;

      return matchText && matchLocation;
    });
  }, [events, q, locationFilter]);

  function getImageSrc(imageUrl) {
    if (!imageUrl) {
      return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80";
    }

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    return `${backend}${imageUrl}`;
  }

  async function handleDelete(eventId) {
    const ok = window.confirm("Delete this event?");
    if (!ok) return;

    try {
      await api.delete(`/events/${eventId}`);
      await load();
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("Failed to delete event");
    }
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Reveal>
        <section className="friendlySection">
          <div className="sectionHeading">
            <h2>Choose your event package</h2>
            <p>
              Pick an event, choose your date, number of attendees, food option,
              and photography add-on.
            </p>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <input
              className="input"
              style={{ maxWidth: 280 }}
              placeholder="Search event or location..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <select
              className="select"
              style={{ maxWidth: 220 }}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </section>
      </Reveal>

      {loading && (
        <div className="friendlyCard" style={{ marginTop: 16 }}>
          Loading events...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="friendlyCard" style={{ marginTop: 16 }}>
          No events found.
        </div>
      )}

      <div className="friendlyGrid3" style={{ marginTop: 18 }}>
        {filtered.map((event) => (
          <Reveal key={event._id}>
            <div className="portfolioCardFriendly">
              <div className="portfolioCardImage">
                <img
                  src={getImageSrc(event.imageUrl)}
                  alt={event.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80";
                  }}
                />
              </div>

              <div className="portfolioCardBody">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{event.title}</h3>
                    <div className="muted" style={{ marginTop: 6 }}>
                      {event.location}
                    </div>
                    <div className="muted" style={{ marginTop: 6 }}>
                      {event.availableDates?.length
                        ? `Available: ${event.availableDates.join(", ")}`
                        : "Date to be confirmed"}
                    </div>
                  </div>

                  <span className="badge">Venue ${event.venuePrice}</span>
                </div>

                <p style={{ marginTop: 12 }}>{event.description}</p>

                <div className="row" style={{ marginTop: 12 }}>
                  <span className="badge">
                    🚗 {event.parkingAvailable ? "Parking Available" : "No Parking"}
                  </span>

                  <span className="badge">
                    📸{" "}
                    {event.photographyService?.available
                      ? `Photo $${event.photographyService.price}`
                      : "No Photo Service"}
                  </span>
                </div>

                <div
                  className="row"
                  style={{ marginTop: 14, justifyContent: "space-between" }}
                >
                  <span className="badge">
                    Food from ${event.foodPricing?.standard || 0}/person
                  </span>

                  <Link
                    className="btn primary"
                    to={`/events/${event._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Select Event
                  </Link>
                </div>

                {user?.role === "admin" && (
                  <div className="row" style={{ marginTop: 10, gap: 10 }}>
                    <button
                      className="btn ghost"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}