import { useState, useCallback } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => {
    if (typeof window !== "undefined") {
      const a = new Audio("/music.mp3");
      a.loop = true;
      a.volume = 0.3;
      return a;
    }
    return null;
  });

  const togglePlay = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked
      });
    }
    setIsPlaying(!isPlaying);
  }, [audio, isPlaying]);

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-300 hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #fdf1f4, #f0c7d6)",
        boxShadow:
          "0 8px 24px rgba(71, 37, 54, 0.3), inset 0 0 0 1px rgba(198, 161, 91, 0.3)",
      }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        /* Animated bars */
        <div className="flex items-end gap-[3px] h-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[3px] bg-plum rounded-full"
              style={{
                animation: `musicBar ${0.4 + i * 0.15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#472536"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}


    </button>
  );
}
