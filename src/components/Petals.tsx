import { useEffect, useRef } from "react";

export default function Petals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const count = window.innerWidth < 600 ? 10 : 16;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const size = 8 + Math.random() * 10;
      p.style.position = "absolute";
      p.style.top = "-5vh";
      p.style.left = `${Math.random() * 100}vw`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = "#e091b5";
      p.style.opacity = `${0.3 + Math.random() * 0.4}`;
      p.style.borderRadius = "70% 0 70% 0";
      p.style.animation = `fall ${9 + Math.random() * 10}s linear ${
        Math.random() * 10
      }s infinite`;
      container.appendChild(p);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
