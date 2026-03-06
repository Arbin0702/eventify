import { useState } from "react";
import api from "../services/api";
import FieldError from "../components/FieldError";
import Toast from "../components/Toast";
import { SERVICES } from "../data/services";
import { SITE_IMAGES } from "../data/siteImages";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    if (!message.trim()) e.message = "Message is required";
    if (message.trim() && message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/contact", { name, email, phone, company, service, budget, message });
      setToast({ type: "success", message: "✅ Message sent! We’ll reply soon." });
      setName(""); setEmail(""); setPhone(""); setCompany(""); setService(""); setBudget(""); setMessage("");
      setFieldErrors({});
    } catch (e) {
      setToast({ type: "error", message: e?.response?.data?.message || "❌ Failed to submit. Try again." });
    } finally {
      setLoading(false);
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
          <span className="badge">Contact</span>
          <h1>Let’s talk about your event</h1>
          <p>
            Tell us what you’re planning and we’ll guide you with the next steps. A friendly contact page helps visitors feel comfortable reaching out.
          </p>
        </div>

        <div className="heroFriendlyImage">
          <img src={SITE_IMAGES.contact} alt="Event team discussion" />
        </div>
      </section>

      <div className="grid2" style={{ marginTop: 18 }}>
        <div className="friendlyCard">
          <h3>Quick details</h3>

          <div style={{ marginTop: 12 }}>
            <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <FieldError message={fieldErrors.name} />
          </div>

          <div style={{ marginTop: 12 }}>
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FieldError message={fieldErrors.email} />
          </div>

          <div style={{ marginTop: 12 }}>
            <input className="input" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <input className="input" placeholder="Company (optional)" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <select className="select" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Select service (optional)</option>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 12 }}>
            <select className="select" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Budget (optional)</option>
              <option value="$1k-$5k">$1k-$5k</option>
              <option value="$5k-$10k">$5k-$10k</option>
              <option value="$10k-$25k">$10k-$25k</option>
              <option value="$25k+">$25k+</option>
            </select>
          </div>
        </div>

        <div className="friendlyCard">
          <h3>Message</h3>

          <div style={{ marginTop: 12 }}>
            <textarea
              className="textarea"
              style={{ minHeight: 220 }}
              placeholder="Example: We need a pop-up activation in Sydney CBD for around 300 people."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <FieldError message={fieldErrors.message} />
          </div>

          <div className="row" style={{ marginTop: 14, justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: 13 }}>
              Friendly reply within 1–2 business days.
            </span>

            <button className="btn primary" onClick={submit} disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}