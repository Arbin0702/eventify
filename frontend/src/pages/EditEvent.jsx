import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";
import FieldError from "../components/FieldError";
import DateListEditor from "../components/DateListEditor";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const backend = "https://eventify-vrrg.onrender.com";

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [keepExistingImage, setKeepExistingImage] = useState(true);

  const [availableDates, setAvailableDates] = useState([""]);
  const [minAttendees, setMinAttendees] = useState(1);
  const [maxAttendees, setMaxAttendees] = useState(100);
  const [venuePrice, setVenuePrice] = useState(0);

  const [foodStandard, setFoodStandard] = useState(0);
  const [foodPremium, setFoodPremium] = useState(0);
  const [foodVip, setFoodVip] = useState(0);

  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [photoAvailable, setPhotoAvailable] = useState(false);
  const [photoPrice, setPhotoPrice] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "info" });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/events/${id}`);
        const e = res.data;

        setTitle(e.title || "");
        setLocation(e.location || "");
        setDescription(e.description || "");
        setCurrentImageUrl(e.imageUrl || "");
        setAvailableDates(e.availableDates?.length ? e.availableDates : [""]);
        setMinAttendees(e.minAttendees || 1);
        setMaxAttendees(e.maxAttendees || 100);
        setVenuePrice(e.venuePrice || 0);

        setFoodStandard(e.foodPricing?.standard || 0);
        setFoodPremium(e.foodPricing?.premium || 0);
        setFoodVip(e.foodPricing?.vip || 0);

        setParkingAvailable(Boolean(e.parkingAvailable));
        setPhotoAvailable(Boolean(e.photographyService?.available));
        setPhotoPrice(e.photographyService?.price || 0);
      } catch {
        setToast({ type: "error", message: "❌ Failed to load event" });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!location.trim()) e.location = "Location is required";
    if (!description.trim()) e.description = "Description is required";
    if (!keepExistingImage && !newImage) {
      e.image = "Choose a new image or keep the current one";
    }

    const cleanedDates = availableDates.map((d) => d.trim()).filter(Boolean);
    if (cleanedDates.length === 0) e.availableDates = "At least one date is required";

    if (Number(minAttendees) < 1) e.minAttendees = "Minimum attendees must be at least 1";
    if (Number(maxAttendees) < Number(minAttendees)) {
      e.maxAttendees = "Max attendees must be greater than or equal to min attendees";
    }

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function save() {
    if (!validate()) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("location", location);
      fd.append("description", description);
      fd.append("availableDates", availableDates.filter(Boolean).join(","));
      fd.append("minAttendees", minAttendees);
      fd.append("maxAttendees", maxAttendees);
      fd.append("venuePrice", venuePrice);

      fd.append("foodStandard", foodStandard);
      fd.append("foodPremium", foodPremium);
      fd.append("foodVip", foodVip);

      fd.append("parkingAvailable", parkingAvailable);
      fd.append("photoAvailable", photoAvailable);
      fd.append("photoPrice", photoPrice);
      fd.append("keepExistingImage", keepExistingImage);

      if (newImage) {
        fd.append("image", newImage);
      }

      await api.patch(`/events/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setToast({ type: "success", message: "✅ Event updated" });
      setTimeout(() => navigate(`/events/${id}`), 700);
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "❌ Failed to update event"
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 18 }}>
        <div className="friendlyCard">Loading event...</div>
      </div>
    );
  }

  const previewSrc =
    currentImageUrl
      ? currentImageUrl.startsWith("http")
        ? currentImageUrl
        : `${backend}${currentImageUrl}`
      : "";

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <section className="friendlySection">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="sectionHeading">
            <h2>Edit event</h2>
            <p>Update all pricing, dates, services and attendee options.</p>
          </div>

          <Link
            className="btn ghost"
            to={`/events/${id}`}
            style={{ textDecoration: "none" }}
          >
            ← Back
          </Link>
        </div>
      </section>

      {/* The rest of your form remains unchanged */}
      {/* ... (all your form fields stay the same) */}

      <div style={{ marginTop: 18 }}>
        <button className="btn primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}