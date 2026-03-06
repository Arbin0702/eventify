import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";

const STATUS_OPTIONS = ["pending", "approved", "completed", "cancelled"];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [savingId, setSavingId] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/bookings/all");
      setBookings(res.data);
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "Failed to load bookings"
      });
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function setLocalStatus(id, status) {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status } : b))
    );
  }

  async function saveStatus(id, status) {
    setSavingId(id);
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      setToast({ type: "success", message: "✅ Booking status updated" });
      await load();
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "Failed to update status"
      });
    } finally {
      setSavingId("");
    }
  }

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
          <h2>Admin bookings</h2>
          <p>Review customer bookings and update their status.</p>
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
              <h3 style={{ margin: 0 }}>{b.eventId?.title || "Unknown Event"}</h3>
              <span className={statusBadgeClass(b.status)}>{b.status}</span>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              <span className="badge">👤 {b.userId?.name || "User"}</span>
              <span className="badge">📧 {b.userId?.email || "No email"}</span>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              <span className="badge">📅 {b.selectedDate}</span>
              <span className="badge">👥 {b.attendees} attendees</span>
              <span className="badge">🍽️ {b.foodPackage}</span>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              <span className="badge">
                📸 {b.photographySelected ? "Photography Yes" : "Photography No"}
              </span>
              <span className="badge">💵 ${b.totalPrice}</span>
              <span className="badge">📍 {b.eventId?.location || "N/A"}</span>
            </div>

            <div style={{ marginTop: 16 }}>
              <label style={{ display: "block", marginBottom: 8 }}>Update status</label>

              <div className="row">
                <select
                  className="select"
                  value={b.status}
                  onChange={(e) => setLocalStatus(b._id, e.target.value)}
                  style={{ maxWidth: 220 }}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  className="btn primary"
                  onClick={() => saveStatus(b._id, b.status)}
                  disabled={savingId === b._id}
                >
                  {savingId === b._id ? "Saving..." : "Save"}
                </button>

                <Link className="btn ghost" to={`/bookings/${b._id}`} style={{ textDecoration: "none" }}>
                  Receipt
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}