import { useEffect, useRef } from "react";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "header" | "footer" | "div";
  delay?: number;
}

export default function RevealSection({
  children,
  className = "",
  as: Tag = "section",
  delay = 0,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);

    return () => {
      io.unobserve(el);
    };
  }, [delay]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(18px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
