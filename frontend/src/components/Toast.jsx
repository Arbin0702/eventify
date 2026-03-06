import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), 2800);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      <div className="toastInner">
        <div className="toastDot" />
        <div style={{ lineHeight: 1.4 }}>{message}</div>
        <button className="toastClose" onClick={onClose} aria-label="Close toast">
          ✕
        </button>
      </div>
    </div>
  );
}