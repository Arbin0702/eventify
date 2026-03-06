import { useEffect, useState } from "react";
import api from "../services/api";
import Notice from "../components/Notice";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await api.get("/contact"); // admin-only
      setMessages(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load inbox (Admin only)");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    setError("");
    setSuccess("");
    try {
      await api.delete(`/contact/${id}`);
      setSuccess("Deleted message");
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || "Delete failed");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="hero heroBig">
        <div className="badge">ADMIN</div>
        <h1 style={{ marginTop: 12 }}>Contact Inbox</h1>
        <p style={{ marginTop: 10 }}>
          View website enquiries (like a real agency inbox).
        </p>
      </div>

      <Notice type="error" message={error} />
      <Notice type="success" message={success} />

      {loading && <div className="card" style={{ marginTop: 14 }}>Loading messages...</div>}

      {!loading && messages.length === 0 && (
        <div className="card" style={{ marginTop: 14 }}>No messages yet.</div>
      )}

      {!loading && messages.map((m) => (
        <div key={m._id} className="card" style={{ marginTop: 14 }}>
          <div className="spread">
            <div>
              <div className="row">
                <span className="badge">👤 {m.name}</span>
                <span className="badge">📧 {m.email}</span>
                {m.phone && <span className="badge">📞 {m.phone}</span>}
                {m.company && <span className="badge">🏢 {m.company}</span>}
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                {m.service && <span className="badge">🧩 {m.service}</span>}
                {m.budget && <span className="badge">💰 {m.budget}</span>}
                <span className="badge">🕒 {formatDate(m.createdAt)}</span>
              </div>
            </div>

            <button className="btn danger" onClick={() => remove(m._id)}>
              Delete
            </button>
          </div>

          <div className="divider" style={{ marginTop: 14 }} />

          <p style={{ marginTop: 14, marginBottom: 0, lineHeight: 1.7 }}>
            {m.message}
          </p>
        </div>
      ))}
    </div>
  );
}