import { useEffect, useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";

const CATEGORIES = ["Activations", "Corporate", "Community", "Exhibitions", "Logistics"];

export default function AdminPortfolio() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Activations");
  const [location, setLocation] = useState("");
  const [outcome, setOutcome] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/work");
      setItems(res.data);
    } catch (e) {
      setToast({ type: "error", message: e?.response?.data?.message || "Failed to load portfolio" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    if (!title || !category || !location || !outcome || !summary || !image) {
      setToast({ type: "error", message: "Please fill all fields + choose an image" });
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("category", category);
      fd.append("location", location);
      fd.append("outcome", outcome);
      fd.append("summary", summary);
      fd.append("image", image);

      await api.post("/work", fd, { headers: { "Content-Type": "multipart/form-data" } });

      setToast({ type: "success", message: "✅ Work item created" });
      setTitle(""); setCategory("Activations"); setLocation(""); setOutcome(""); setSummary(""); setImage(null);
      await load();
    } catch (e) {
      setToast({ type: "error", message: e?.response?.data?.message || "Create failed" });
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    try {
      await api.delete(`/work/${id}`);
      setToast({ type: "success", message: "Deleted" });
      await load();
    } catch (e) {
      setToast({ type: "error", message: e?.response?.data?.message || "Delete failed" });
    }
  }

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />

      <div className="hero heroBig">
        <div className="badge">ADMIN</div>
        <h1 style={{ marginTop: 12 }}>Portfolio Manager</h1>
        <p style={{ marginTop: 10 }}>Upload real images and publish portfolio cards.</p>
      </div>

      <div className="grid2" style={{ marginTop: 14 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Create new work item</h3>

          <div style={{ marginTop: 10 }}>
            <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ marginTop: 12 }}>
            <input className="input" placeholder="Location (e.g. Sydney)" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <input className="input" placeholder="Outcome (e.g. 3,200 attendees)" value={outcome} onChange={(e) => setOutcome(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <textarea className="textarea" placeholder="Short summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          </div>

          <div style={{ marginTop: 12 }}>
            <input
              className="input"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              PNG/JPG/WebP up to 4MB.
            </div>
          </div>

          <div className="row" style={{ marginTop: 14, justifyContent: "flex-end" }}>
            <button className="btn primary" onClick={create} disabled={saving}>
              {saving ? "Uploading..." : "Create Work"}
            </button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Published items</h3>

          {loading && <div className="muted">Loading...</div>}

          {!loading && items.length === 0 && <div className="muted">No items yet.</div>}

          {!loading && items.map((w) => (
            <div key={w._id} className="panel padded" style={{ marginTop: 10 }}>
              <div className="spread">
                <div>
                  <div style={{ fontWeight: 900 }}>{w.title}</div>
                  <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
                    {w.category} · {w.location}
                  </div>
                </div>
                <button className="btn danger" onClick={() => remove(w._id)}>
                  Delete
                </button>
              </div>
              <div className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6 }}>
                {w.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}