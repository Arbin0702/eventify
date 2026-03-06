export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="hero">
        <h1>Profile</h1>
        <p>Your account information and role.</p>
      </div>

      <div className="card" style={{ marginTop: 14, maxWidth: 720 }}>
        {!user ? (
          <p style={{ margin: 0 }}>Not logged in.</p>
        ) : (
          <>
            <div className="row">
              <span className="badge">👤 {user.name}</span>
              <span className="badge">📧 {user.email}</span>
              <span className="badge">🛡️ {user.role}</span>
            </div>

            <p className="muted" style={{ marginTop: 12 }}>
              Tip: Admin can create/edit/delete events. Users can book and cancel.
            </p>
          </>
        )}
      </div>
    </div>
  );
}