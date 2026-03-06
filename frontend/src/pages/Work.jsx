import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Reveal from "../components/RevealComponent";
import { getCategoryImage } from "../data/siteImages";

const FILTERS = ["All", "Activations", "Corporate", "Community", "Exhibitions", "Logistics"];

function FilterPill({ active, label, onClick }) {
  return (
    <button className={`pill ${active ? "active" : ""}`} onClick={onClick} type="button">
      {label}
    </button>
  );
}

function WorkCard({ item }) {
  const backend = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const imgSrc =
    item.imageUrl
      ? item.imageUrl.startsWith("http")
        ? item.imageUrl
        : `${backend}${item.imageUrl}`
      : getCategoryImage(item.category);

  return (
    <div className="portfolioCardFriendly">
      <div className="portfolioCardImage">
        <img src={imgSrc} alt={item.title} />
      </div>

      <div className="portfolioCardBody">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h3 style={{ margin: 0 }}>{item.title}</h3>
            <div className="muted" style={{ marginTop: 6 }}>
              {item.location} · {item.category}
            </div>
          </div>
          <span className="badge">{item.category}</span>
        </div>

        <p style={{ marginTop: 12 }}>{item.summary}</p>

        <div className="row" style={{ marginTop: 12, justifyContent: "space-between" }}>
          <span className="badge">📈 {item.outcome}</span>
          <Link className="btn ghost" to="/contact" style={{ textDecoration: "none" }}>
            Ask About This
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/work");
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((w) => w.category === filter);
  }, [items, filter]);

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <Reveal>
        <section className="friendlySection">
          <div className="sectionHeading">
            <h2>Portfolio & past work</h2>
            <p>
              The page is now more image-led and easier to browse, which makes it feel more like a real agency portfolio.
            </p>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            {FILTERS.map((f) => (
              <FilterPill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
            ))}
          </div>
        </section>
      </Reveal>

      {loading && <div className="friendlyCard" style={{ marginTop: 14 }}>Loading portfolio...</div>}

      {!loading && filtered.length === 0 && (
        <div className="friendlyCard" style={{ marginTop: 14 }}>
          No portfolio items yet. Admin can upload them from the portfolio manager.
        </div>
      )}

      <div className="friendlyGrid3" style={{ marginTop: 16 }}>
        {filtered.map((item) => (
          <Reveal key={item._id}>
            <WorkCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}