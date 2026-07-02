import { useState } from "react";

export default function AccessCard() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const response = await fetch("/AccessCard.jpeg");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "MO-2026-Access-Card.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mb-10 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Access Card
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>

      {/* Access Card Image */}
      <div
        className="rounded-2xl overflow-hidden mx-auto max-w-[520px]"
        style={{
          border: "1px solid rgba(198, 161, 91, 0.4)",
          boxShadow: "0 20px 45px -20px rgba(90, 24, 66, 0.45)",
        }}
      >
        <img
          src="/AccessCard.jpeg"
          alt="Access Card — Olufunso & Modupe Wedding #M'O 2026 — Venue directions and RSVP details"
          className="block w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        id="download-access-card-btn"
        className="mt-5 inline-flex items-center gap-2 font-marcellus tracking-[0.12em] uppercase text-[0.72rem] text-cream py-3 px-6 rounded-full cursor-pointer transition-all duration-300 border-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg"
        style={{
          background: "linear-gradient(135deg, #5a1842, #8e2463)",
          boxShadow: "0 8px 20px -8px rgba(90, 24, 66, 0.5)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7,10 12,15 17,10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {downloading ? "Downloading..." : "Download Access Card"}
      </button>
    </div>
  );
}
