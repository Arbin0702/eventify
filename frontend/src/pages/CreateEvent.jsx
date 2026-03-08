import { useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";
import FieldError from "../components/FieldError";
import DateListEditor from "../components/DateListEditor";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [availableDates, setAvailableDates] = useState([""]);
  const [minAttendees, setMinAttendees] = useState(1);
  const [maxAttendees, setMaxAttendees] = useState(100);
  const [venuePrice, setVenuePrice] = useState(0);

  const [foodStandard, setFoodStandard] = useState(10);
  const [foodPremium, setFoodPremium] = useState(15);
  const [foodVip, setFoodVip] = useState(20);

  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [photoAvailable, setPhotoAvailable] = useState(true);
  const [photoPrice, setPhotoPrice] = useState(25);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!location.trim()) e.location = "Location is required";
    if (!description.trim()) e.description = "Description is required";
    if (!image) e.image = "Event image is required";

    const cleanedDates = availableDates.map((d) => d.trim()).filter(Boolean);
    if (cleanedDates.length === 0) e.availableDates = "At least one date is required";

    if (Number(minAttendees) < 1) e.minAttendees = "Minimum attendees must be at least 1";
    if (Number(maxAttendees) < Number(minAttendees)) {
      e.maxAttendees = "Max attendees must be greater than or equal to min attendees";
    }

    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function create() {
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

      fd.append("image", image);

      await api.post("/events", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setToast({ type: "success", message: "✅ Event created successfully" });

      setTitle("");
      setLocation("");
      setDescription("");
      setImage(null);
      setAvailableDates([""]);
      setMinAttendees(1);
      setMaxAttendees(100);
      setVenuePrice(0);
      setFoodStandard(10);
      setFoodPremium(15);
      setFoodVip(20);
      setParkingAvailable(false);
      setPhotoAvailable(true);
      setPhotoPrice(25);
      setFieldErrors({});
    } catch (e) {
      setToast({
        type: "error",
        message: e?.response?.data?.message || "❌ Failed to create event"
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <section className="heroFriendly smallHero">
        <div className="heroFriendlyContent">
          <span className="badge">Admin</span>
          <h1>Create a complete event package</h1>
          <p>
            Upload an event image and add dates, attendees, pricing, parking and photography options.
          </p>
        </div>

        <div className="heroFriendlyImage">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80"
            alt="Create event"
          />
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

          <div style={{ marginTop: 12 }}>
            <input
              className="input"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
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
        <button className="btn primary" onClick={create} disabled={saving}>
          {saving ? "Creating..." : "Create Event"}
        </button>
      </div>
    </div>
  );
}