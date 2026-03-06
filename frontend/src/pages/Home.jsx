import { Link } from "react-router-dom";
import Reveal from "../components/RevealComponent";
import Counter from "../components/Counter";
import { SITE_IMAGES } from "../data/siteImages";

function Stat({ valueNode, label }) {
  return (
    <div className="friendlyStat">
      <div className="friendlyStatValue">{valueNode}</div>
      <div className="friendlyStatLabel">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="friendlyCard">
      <div className="friendlyIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Testimonial({ name, role, text }) {
  return (
    <div className="testimonialCard">
      <div className="testimonialQuote">“</div>
      <p>{text}</p>
      <div className="testimonialMeta">
        <strong>{name}</strong> · {role}
      </div>
    </div>
  );
}

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Reveal>
        <section className="heroFriendly">
          <div className="heroFriendlyContent">
            <span className="badge">Event planning made simple</span>
            <h1>Create unforgettable events with a website that feels real</h1>
            <p>
              Eventify combines a modern event agency style with a working booking platform.
              Showcase your services, display past work, and let users browse and book events easily.
            </p>

            <div className="row" style={{ marginTop: 16 }}>
              <Link className="btn primary" to="/events" style={{ textDecoration: "none" }}>
                Explore Events
              </Link>
              <Link className="btn" to="/services" style={{ textDecoration: "none" }}>
                Our Services
              </Link>
              {!token && (
                <Link className="btn ghost" to="/register" style={{ textDecoration: "none" }}>
                  Get Started
                </Link>
              )}
            </div>

            <div className="heroStatsRow">
              <Stat valueNode={<Counter to={24} suffix="/7" />} label="Access" />
              <Stat valueNode={<Counter to={6} suffix="+" />} label="Service Types" />
              <Stat valueNode={<Counter to={100} suffix="%" />} label="Mobile Ready" />
            </div>
          </div>

          <div className="heroFriendlyImage">
            <img src={SITE_IMAGES.hero} alt="People enjoying an event" />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="friendlySection">
          <div className="sectionHeading">
            <h2>Why people will enjoy using your website</h2>
            <p>
              The design now feels softer, more visual, and easier to trust — closer to real event agency websites.
            </p>
          </div>

          <div className="friendlyGrid3">
            <FeatureCard
              icon="🎉"
              title="Friendly first impression"
              text="Large visuals, softer cards, and cleaner spacing make the website feel welcoming."
            />
            <FeatureCard
              icon="🖼️"
              title="More visual storytelling"
              text="Images help visitors quickly understand your services and the kind of events you create."
            />
            <FeatureCard
              icon="⚡"
              title="Easy to navigate"
              text="Clear buttons and simple page flow help people move from interest to enquiry fast."
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="splitPromo">
          <div className="splitPromoImage">
            <img src={SITE_IMAGES.services} alt="Event production setup" />
          </div>

          <div className="splitPromoText">
            <span className="badge">Agency-style presentation</span>
            <h2>Show services like a real event company</h2>
            <p>
              Present activations, corporate events, community events, exhibitions and logistics
              in a way that feels premium and professional.
            </p>
            <div className="row" style={{ marginTop: 14 }}>
              <Link className="btn primary" to="/services" style={{ textDecoration: "none" }}>
                View Services
              </Link>
              <Link className="btn" to="/work" style={{ textDecoration: "none" }}>
                See Portfolio
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="friendlySection">
          <div className="sectionHeading">
            <h2>What clients might say</h2>
            <p>These short testimonials make the site feel more trustworthy and human.</p>
          </div>

          <div className="friendlyGrid3">
            <Testimonial
              name="Lucy E."
              role="Producer"
              text="The website felt polished and the booking process was straightforward for our team and guests."
            />
            <Testimonial
              name="James C."
              role="General Manager"
              text="Clear, professional, and easy to use. It looked much more like a real company website."
            />
            <Testimonial
              name="Abby M."
              role="Client Lead"
              text="The visuals made a big difference. The whole experience felt more modern and premium."
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="ctaFriendly">
          <div>
            <h2>Ready to plan something amazing?</h2>
            <p>
              Browse live events, review services, or send an enquiry and start the conversation.
            </p>
          </div>

          <div className="row">
            <Link className="btn primary" to="/contact" style={{ textDecoration: "none" }}>
              Request Quote
            </Link>
            <Link className="btn" to="/events" style={{ textDecoration: "none" }}>
              Browse Events
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}