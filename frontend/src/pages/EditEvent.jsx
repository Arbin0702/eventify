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
        const item = res.data;

        setTitle(item.title || "");
        setLocation(item.location || "");
        setDescription(item.description || "");
        setCurrentImageUrl(item.imageUrl || "");
        setAvailableDates(item.availableDates?.length ? item.availableDates : [""]);
        setMinAttendees(item.minAttendees || 1);
        setMaxAttendees(item.maxAttendees || 100);
        setVenuePrice(item.venuePrice || 0);

        setFoodStandard(item.foodPricing?.standard > 0 ? item.foodPricing.standard : 10);
        setFoodPremium(item.foodPricing?.premium > 0 ? item.foodPricing.premium : 15);
        setFoodVip(item.foodPricing?.vip > 0 ? item.foodPricing.vip : 20);

        setParkingAvailable(Boolean(item.parkingAvailable));
        setPhotoAvailable(
          item.photographyService?.available !== undefined
            ? Boolean(item.photographyService.available)
            : true
        );
        setPhotoPrice(
          item.photographyService?.price > 0
            ? item.photographyService.price
            : 25
        );
      } catch {
        setToast({ type: "error", message: "❌ Failed to load event" });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  function validate() {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!location.trim()) errors.location = "Location is required";
    if (!description.trim()) errors.description = "Description is required";
    if (!keepExistingImage && !newImage) {
      errors.image = "Choose a new image or keep the current one";
    }

    const cleanedDates = availableDates.map((d) => d.trim()).filter(Boolean);
    if (cleanedDates.length === 0) errors.availableDates = "At least one date is required";

    if (Number(minAttendees) < 1) errors.minAttendees = "Minimum attendees must be at least 1";
    if (Number(maxAttendees) < Number(minAttendees)) {
      errors.maxAttendees = "Max attendees must be greater than or equal to min attendees";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
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
    } catch (err) {
      setToast({
        type: "error",
        message: err?.response?.data?.message || "❌ Failed to update event"
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

  const previewSrc = currentImageUrl
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

      <div className="grid2" style={{ marginTop: 18 }}>
        <div className="friendlyCard">
          <h3>Basic details</h3>

          <div style={{ marginTop: 12 }}>
            <input
              className="input"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FieldError message={fieldErrors.title} />
          </div>

          <div style={{ marginTop: 12 }}>
            <input
              className="input"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <FieldError message={fieldErrors.location} />
          </div>

          {previewSrc && (
            <div style={{ marginTop: 12 }}>
              <img
                src={previewSrc}
                alt="Current event"
                style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80";
                }}
              />
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <label className="row" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={keepExistingImage}
                onChange={(e) => setKeepExistingImage(e.target.checked)}
              />
              <span>Keep current image</span>
            </label>
          </div>

          <div style={{ marginTop: 12 }}>
            <input
              className="input"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
            <FieldError message={fieldErrors.image} />
          </div>

          <div style={{ marginTop: 12 }}>
            <textarea
              className="textarea"
              style={{ minHeight: 140 }}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FieldError message={fieldErrors.description} />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Available dates</label>
            <DateListEditor
              dates={availableDates}
              setDates={setAvailableDates}
              error={fieldErrors.availableDates}
            />
          </div>
        </div>

        <div className="friendlyCard">
          <h3>Capacity & venue</h3>

          <div style={{ marginTop: 12 }}>
            <label>Minimum attendees</label>
            <input
              className="input"
              type="number"
              value={minAttendees}
              onChange={(e) => setMinAttendees(e.target.value)}
            />
            <FieldError message={fieldErrors.minAttendees} />
          </div>

          <div style={{ marginTop: 12 }}>
            <label>Maximum attendees</label>
            <input
              className="input"
              type="number"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
            />
            <FieldError message={fieldErrors.maxAttendees} />
          </div>

          <div style={{ marginTop: 12 }}>
            <label>Venue price</label>
            <input
              className="input"
              type="number"
              value={venuePrice}
              onChange={(e) => setVenuePrice(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label className="row" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={parkingAvailable}
                onChange={(e) => setParkingAvailable(e.target.checked)}
              />
              <span>Parking available</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 18 }}>
        <div className="friendlyCard">
          <h3>Food pricing (per person)</h3>

          <div style={{ marginTop: 12 }}>
            <label>Standard</label>
            <input
              className="input"
              type="number"
              value={foodStandard}
              onChange={(e) => setFoodStandard(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label>Premium</label>
            <input
              className="input"
              type="number"
              value={foodPremium}
              onChange={(e) => setFoodPremium(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label>VIP</label>
            <input
              className="input"
              type="number"
              value={foodVip}
              onChange={(e) => setFoodVip(e.target.value)}
            />
          </div>
        </div>

        <div className="friendlyCard">
          <h3>Photography service</h3>

          <div style={{ marginTop: 12 }}>
            <label className="row" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={photoAvailable}
                onChange={(e) => {
                  setPhotoAvailable(e.target.checked);
                  if (e.target.checked && Number(photoPrice) <= 0) {
                    setPhotoPrice(25);
                  }
                }}
              />
              <span>Photography available</span>
            </label>
          </div>

          <div style={{ marginTop: 12 }}>
            <label>Photography price</label>
            <input
              className="input"
              type="number"
              value={photoPrice}
              onChange={(e) => setPhotoPrice(e.target.value)}
              disabled={!photoAvailable}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}