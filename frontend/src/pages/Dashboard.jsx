import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "info" });

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/bookings/me");
      setBookings(res.data);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function cancelBooking(id) {
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setToast({ type: "success", message: "✅ Booking cancelled" });
      await load();
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "❌ Cancel failed"
      });
    }
  }

  useEffect(() => {
    load();
  }, []);

  function statusBadgeClass(status) {
    switch (status) {
      case "approved":
        return "statusBadge approved";
      case "completed":
        return "statusBadge completed";
      case "cancelled":
        return "statusBadge cancelled";
      default:
        return "statusBadge pending";
    }
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <section className="friendlySection">
        <div className="sectionHeading">
          <h2>My bookings</h2>
          <p>See your selected dates, attendees, packages, total price and status.</p>
        </div>
      </section>

      {loading && (
        <div className="friendlyCard" style={{ marginTop: 16 }}>
          Loading bookings...
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="friendlyCard" style={{ marginTop: 16 }}>
          No bookings yet.
        </div>
      )}

      <div className="friendlyGrid2" style={{ marginTop: 18 }}>
        {bookings.map((b) => (
          <div key={b._id} className="friendlyCard">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ marginTop: 0 }}>{b.eventId?.title}</h3>
              <span className={statusBadgeClass(b.status)}>{b.status}</span>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              <span className="badge">📅 {b.selectedDate}</span>
              <span className="badge">👥 {b.attendees} attendees</span>
              <span className="badge">🍽️ {b.foodPackage}</span>
              <span className="badge">📸 {b.photographySelected ? "Yes" : "No"}</span>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <span className="badge">💵 Total ${b.totalPrice}</span>
              <span className="badge">📍 {b.eventId?.location}</span>
            </div>

            <div className="muted" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>
              {b.status === "pending" && "Your booking is waiting for admin review."}
              {b.status === "approved" && "Your booking has been approved. A confirmation email has been sent and your receipt is now available."}
              {b.status === "completed" && "This booking has been completed successfully. Your receipt remains available below."}
              {b.status === "cancelled" && "This booking has been cancelled."}
            </div>

            <div className="row" style={{ marginTop: 16 }}>
              {(b.status === "approved" || b.status === "completed") && (
                <Link className="btn ghost" to={`/bookings/${b._id}`} style={{ textDecoration: "none" }}>
                  View Receipt
                </Link>
              )}

              <button
                className="btn"
                onClick={() => cancelBooking(b._id)}
                disabled={b.status === "cancelled" || b.status === "completed"}
              >
                {b.status === "cancelled"
                  ? "Cancelled"
                  : b.status === "completed"
                  ? "Completed"
                  : "Cancel Booking"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}