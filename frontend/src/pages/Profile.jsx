import { Link } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: 18 }}>
        <div className="friendlyCard">
          <h2>Profile</h2>
          <p>You are not logged in.</p>
          <div style={{ marginTop: 14 }}>
            <Link className="btn primary" to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const joinedText = "Member account active";
  const roleLabel = user.role === "admin" ? "Administrator" : "Customer";

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <section className="heroFriendly smallHero">
        <div className="heroFriendlyContent">
          <span className="badge">{roleLabel}</span>
          <h1>Welcome, {user.name}</h1>
          <p>
            Manage your account details, review your activity, and quickly access the
            tools that matter most to you.
          </p>
        </div>

        <div className="heroFriendlyImage">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
            alt="Profile"
          />
        </div>
      </section>

      <div className="grid2" style={{ marginTop: 18 }}>
        <div className="friendlyCard">
          <h3>Account overview</h3>

          <div style={{ marginTop: 14 }}>
            <div className="summaryRow">
              <span>Full name</span>
              <strong>{user.name || "Not provided"}</strong>
            </div>

            <div className="summaryRow">
              <span>Email</span>
              <strong>{user.email || "Not provided"}</strong>
            </div>

            <div className="summaryRow">
              <span>Role</span>
              <strong>{roleLabel}</strong>
            </div>

            <div className="summaryRow">
              <span>Status</span>
              <strong>Active</strong>
            </div>

            <div className="summaryRow">
              <span>Account note</span>
              <strong>{joinedText}</strong>
            </div>
          </div>
        </div>

        <div className="friendlyCard">
          <h3>{user.role === "admin" ? "Admin quick actions" : "User quick actions"}</h3>

          <div className="friendlyGrid2" style={{ marginTop: 14 }}>
            <Link className="btn primary" to="/dashboard" style={{ textDecoration: "none" }}>
              My Bookings
            </Link>

            <Link className="btn ghost" to="/events" style={{ textDecoration: "none" }}>
              Browse Events
            </Link>

            {user.role === "admin" && (
              <>
                <Link className="btn primary" to="/create-event" style={{ textDecoration: "none" }}>
                  Create Event
                </Link>

                <Link className="btn ghost" to="/admin/bookings" style={{ textDecoration: "none" }}>
                  Manage Bookings
                </Link>

                <Link className="btn ghost" to="/admin/inbox" style={{ textDecoration: "none" }}>
                  View Inbox
                </Link>

                <Link className="btn ghost" to="/admin/portfolio" style={{ textDecoration: "none" }}>
                  Portfolio Admin
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 18 }}>
        <div className="friendlyCard">
          <h3>{user.role === "admin" ? "Administrator access" : "Booking support"}</h3>
          <p style={{ marginTop: 12 }}>
            {user.role === "admin"
              ? "As an administrator, you can create and update events, review bookings, and manage operational content across the platform."
              : "As a customer, you can explore events, confirm bookings, and review your booking activity through your dashboard."}
          </p>

          <div className="row" style={{ marginTop: 14, gap: 10, flexWrap: "wrap" }}>
            <span className="badge">Secure login</span>
            <span className="badge">Role-based access</span>
            <span className="badge">Live platform account</span>
          </div>
        </div>

        <div className="friendlyCard">
          <h3>Next steps</h3>
          <p style={{ marginTop: 12 }}>
            Keep your experience moving with quick links to the most common account actions.
          </p>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <Link className="btn ghost" to="/dashboard" style={{ textDecoration: "none" }}>
              View dashboard
            </Link>

            <Link className="btn ghost" to="/contact" style={{ textDecoration: "none" }}>
              Contact support
            </Link>

            <Link className="btn ghost" to="/events" style={{ textDecoration: "none" }}>
              Explore more events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}