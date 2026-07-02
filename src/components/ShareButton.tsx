import { useCallback } from "react";

export default function ShareButton() {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Olufunso & Modupe — Wedding Invitation",
      text: "You are cordially invited to the wedding ceremony of Olufunso & Modupe on Saturday, 1st of August, 2026! #M'O 2026",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy link
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch {
        // Clipboard failed
      }
    }
  }, []);

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 font-marcellus tracking-[0.12em] uppercase text-[0.72rem] bg-transparent border border-rose-gold text-rose-gold py-2.5 px-5 rounded-full cursor-pointer transition-all duration-300 hover:bg-rose-gold hover:text-cream"
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
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      Share Invitation
    </button>
  );
}
