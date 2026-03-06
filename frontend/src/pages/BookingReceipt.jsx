import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";

export default function BookingReceipt() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "info" });

  async function load() {
    setLoading(true);
    try {
      const res = await api.get(`/bookings/${id}`);
      setBooking(res.data);
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "Failed to load receipt"
      });
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  const breakdown = useMemo(() => {
    if (!booking?.eventId) return { venue: 0, food: 0, photo: 0 };
    const event = booking.eventId;
    const venue = event.venuePrice || 0;
    const perPerson = event.foodPricing?.[booking.foodPackage] || 0;
    const food = perPerson * booking.attendees;
    const photo =
      booking.photographySelected && event.photographyService?.available
        ? event.photographyService.price || 0
        : 0;
    return { venue, food, photo };
  }, [booking]);

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

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 18 }}>
        <div className="friendlyCard">Loading receipt...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container" style={{ paddingTop: 18 }}>
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "info" })}
        />
        <div className="friendlyCard">Booking not found.</div>
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

      <div className="receiptCard">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="badge">Receipt</div>
            <h2 style={{ marginTop: 12, marginBottom: 0 }}>Booking Confirmation</h2>
            <div className="muted" style={{ marginTop: 8 }}>
              Booking ID: {booking._id}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span className={statusBadgeClass(booking.status)}>{booking.status}</span>
            <div className="muted" style={{ marginTop: 10 }}>
              Created: {new Date(booking.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginTop: 18 }} />

        <div className="grid2" style={{ marginTop: 18 }}>
          <div>
            <h3 style={{ marginTop: 0 }}>Customer</h3>
            <div className="receiptLine"><span>Name</span><strong>{booking.userId?.name || "N/A"}</strong></div>
            <div className="receiptLine"><span>Email</span><strong>{booking.userId?.email || "N/A"}</strong></div>
          </div>

          <div>
            <h3 style={{ marginTop: 0 }}>Event</h3>
            <div className="receiptLine"><span>Event</span><strong>{booking.eventId?.title || "N/A"}</strong></div>
            <div className="receiptLine"><span>Location</span><strong>{booking.eventId?.location || "N/A"}</strong></div>
            <div className="receiptLine"><span>Date</span><strong>{booking.selectedDate}</strong></div>
          </div>
        </div>

        <div className="divider" style={{ marginTop: 18 }} />

        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginTop: 0 }}>Package details</h3>
          <div className="receiptLine"><span>Attendees</span><strong>{booking.attendees}</strong></div>
          <div className="receiptLine"><span>Food package</span><strong>{booking.foodPackage}</strong></div>
          <div className="receiptLine">
            <span>Photography</span>
            <strong>{booking.photographySelected ? "Included" : "Not included"}</strong>
          </div>
        </div>

        <div className="divider" style={{ marginTop: 18 }} />

        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginTop: 0 }}>Price breakdown</h3>
          <div className="receiptLine"><span>Venue</span><strong>${breakdown.venue}</strong></div>
          <div className="receiptLine"><span>Food</span><strong>${breakdown.food}</strong></div>
          <div className="receiptLine"><span>Photography</span><strong>${breakdown.photo}</strong></div>
          <div className="receiptLine receiptGrand"><span>Total</span><strong>${booking.totalPrice}</strong></div>
        </div>

        <div className="row" style={{ marginTop: 22 }}>
          <Link className="btn ghost" to="/dashboard" style={{ textDecoration: "none" }}>
            Back to Dashboard
          </Link>
          <button className="btn primary" onClick={() => window.print()}>
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}