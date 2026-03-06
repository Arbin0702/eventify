import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Notice from "../components/Notice";
import FieldError from "../components/FieldError";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    if (password.trim() && password.trim().length < 6) e.password = "Password must be at least 6 characters";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleRegister() {
    setError("");
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess("Registered! Redirecting to login...");
      setTimeout(() => navigate("/login"), 600);
    } catch (e) {
      setError(e?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <div className="hero">
        <h1>Create your account ✨</h1>
        <p>Register to start booking and tracking your events.</p>
      </div>

      <Notice type="error" message={error} />
      <Notice type="success" message={success} />

      <div className="card" style={{ marginTop: 14, maxWidth: 620 }}>
        <div className="grid2">
          <div>
            <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <FieldError message={fieldErrors.name} />
          </div>

          <div>
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FieldError message={fieldErrors.email} />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <input
            className="input"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FieldError message={fieldErrors.password} />
        </div>

        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn primary" onClick={handleRegister} disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
          <span className="muted">We don’t share your info.</span>
        </div>
      </div>
    </div>
  );
}