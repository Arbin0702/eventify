import { useEffect, useState } from "react";

export default function Counter({ to = 100, duration = 900, suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}