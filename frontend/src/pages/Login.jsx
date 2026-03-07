import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Notice from "../components/Notice";
import FieldError from "../components/FieldError";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleLogin() {
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/events");
      window.location.reload();
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <div className="hero">
        <h1>Welcome back 👋</h1>
        <p>Login to book events and manage your dashboard.</p>
      </div>

      <Notice type="error" message={error} />

      <div className="card" style={{ marginTop: 14, maxWidth: 520 }}>
        <div className="grid2">
          <div>
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FieldError message={fieldErrors.email} />
          </div>

          <div>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FieldError message={fieldErrors.password} />
          </div>
        </div>

        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn primary" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <span className="muted">Tip: admin@test.com / Admin12345</span>
        </div>
      </div>
    </div>
  );
}