import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const backend = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [foodPackage, setFoodPackage] = useState("standard");
  const [photographySelected, setPhotographySelected] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "info" });

  useEffect(() => {
    let ignore = false;

    async function loadEvent() {
      setLoading(true);
      try {
        const res = await api.get(`/events/${id}`);
        if (!ignore) {
          setEvent(res.data);
          setSelectedDate(res.data.availableDates?.[0] || "");
          setAttendees(res.data.minAttendees || 1);
        }
      } catch {
        if (!ignore) {
          setEvent(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      ignore = true;
    };
  }, [id]);

  const foodPrice = useMemo(() => {
    if (!event) return 0;
    return event.foodPricing?.[foodPackage] || 0;
  }, [event, foodPackage]);

  const photographyPrice = useMemo(() => {
    if (!event) return 0;
    return photographySelected && event.photographyService?.available
      ? event.photographyService.price
      : 0;
  }, [event, photographySelected]);

  const total = useMemo(() => {
    if (!event) return 0;
    return event.venuePrice + foodPrice * attendees + photographyPrice;
  }, [event, attendees, foodPrice, photographyPrice]);

  function increaseAttendees() {
    if (!event) return;
    setAttendees((prev) => Math.min(prev + 1, event.maxAttendees));
  }

  function decreaseAttendees() {
    if (!event) return;
    setAttendees((prev) => Math.max(prev - 1, event.minAttendees));
  }

  async function bookNow() {
    if (!selectedDate) {
      setToast({ type: "error", message: "Please select a date" });
      return;
    }

    if (attendees < event.minAttendees || attendees > event.maxAttendees) {
      setToast({
        type: "error",
        message: `Attendees must be between ${event.minAttendees} and ${event.maxAttendees}`
      });
      return;
    }

    try {
      await api.post("/bookings", {
        eventId: id,
        selectedDate,
        attendees: Number(attendees),
        foodPackage,
        photographySelected
      });

      setToast({ type: "success", message: "✅ Booking successful!" });
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "❌ Booking failed"
      });
    }
  }

  function getImageSrc(imageUrl) {
    if (!imageUrl) {
      return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80";
    }

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    return `${backend}${imageUrl}`;
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 18 }}>
        <div className="friendlyCard">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container" style={{ paddingTop: 18 }}>
        <div className="friendlyCard">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <div className="portfolioCardFriendly">
        <div className="portfolioCardImage" style={{ height: 360 }}>
          <img
            src={getImageSrc(event.imageUrl)}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80";
            }}
          />
        </div>

        <div className="portfolioCardBody">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <h2 style={{ margin: 0 }}>{event.title}</h2>
              <div className="muted" style={{ marginTop: 8 }}>{event.location}</div>
            </div>

            <Link className="btn ghost" to="/events" style={{ textDecoration: "none" }}>
              ← Back
            </Link>
          </div>

          <p style={{ marginTop: 14 }}>{event.description}</p>

          <div className="grid2" style={{ marginTop: 18 }}>
            <div className="friendlyCard">
              <h3>Choose your package</h3>

              <div style={{ marginTop: 12 }}>
                <label>Date</label>
                <select
                  className="select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {event.availableDates.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 14 }}>
                <label>Attendees</label>

                <div className="attendeeSelector" style={{ marginTop: 8 }}>
                  <button className="btn ghost" type="button" onClick={decreaseAttendees}>
                    −
                  </button>

                  <div className="attendeeValue">{attendees}</div>

                  <button className="btn ghost" type="button" onClick={increaseAttendees}>
                    +
                  </button>
                </div>

                <div className="muted" style={{ marginTop: 8, fontSize: 13 }}>
                  Minimum {event.minAttendees} · Maximum {event.maxAttendees}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <label>Food package</label>
                <select
                  className="select"
                  value={foodPackage}
                  onChange={(e) => setFoodPackage(e.target.value)}
                >
                  <option value="standard">Standard (${event.foodPricing.standard}/person)</option>
                  <option value="premium">Premium (${event.foodPricing.premium}/person)</option>
                  <option value="vip">VIP (${event.foodPricing.vip}/person)</option>
                </select>
              </div>

              <div style={{ marginTop: 14 }}>
                <label className="row" style={{ cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={photographySelected}
                    onChange={(e) => setPhotographySelected(e.target.checked)}
                    disabled={!event.photographyService?.available}
                  />
                  <span>
                    Add photography
                    {event.photographyService?.available
                      ? ` ($${event.photographyService.price})`
                      : " (Not available)"}
                  </span>
                </label>
              </div>

              <div className="row" style={{ marginTop: 14 }}>
                <span className="badge">🚗 {event.parkingAvailable ? "Parking Available" : "No Parking"}</span>
                <span className="badge">
                  Capacity: {event.minAttendees}–{event.maxAttendees}
                </span>
              </div>
            </div>

            <div className="friendlyCard">
              <h3>Booking summary</h3>

              <div className="summaryRow" style={{ marginTop: 14 }}>
                <span>Selected date</span>
                <strong>{selectedDate || "Not selected"}</strong>
              </div>

              <div className="summaryRow">
                <span>Venue</span>
                <strong>${event.venuePrice}</strong>
              </div>

              <div className="summaryRow">
                <span>
                  Food ({foodPackage}) × {attendees}
                </span>
                <strong>${foodPrice * attendees}</strong>
              </div>

              <div className="summaryRow">
                <span>Photography</span>
                <strong>${photographyPrice}</strong>
              </div>

              <div className="divider" style={{ marginTop: 14 }} />

              <div className="summaryRow summaryTotal" style={{ marginTop: 14 }}>
                <span>Total</span>
                <strong>${total}</strong>
              </div>

              <div style={{ marginTop: 18 }}>
                <button className="btn primary" onClick={bookNow}>
                  Confirm Booking
                </button>
              </div>

              <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
                Your booking will appear in your dashboard after confirmation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}