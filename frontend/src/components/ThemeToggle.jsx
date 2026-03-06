import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="btn ghost"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      type="button"
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}