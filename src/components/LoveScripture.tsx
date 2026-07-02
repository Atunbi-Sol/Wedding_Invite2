import { useState, useEffect, useCallback } from "react";

interface Scripture {
  text: string;
  reference: string;
}

const SCRIPTURES: Scripture[] = [
  {
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    reference: "1 Corinthians 13:4–5",
  },
  {
    text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.",
    reference: "Ecclesiastes 4:9–10",
  },
  {
    text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    reference: "1 Corinthians 13:13",
  },
  {
    text: "Above all, love each other deeply, because love covers over a multitude of sins.",
    reference: "1 Peter 4:8",
  },
  {
    text: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death, its jealousy unyielding as the grave.",
    reference: "Song of Solomon 8:6",
  },
  {
    text: "Let all that you do be done in love.",
    reference: "1 Corinthians 16:14",
  },
  {
    text: "Be completely humble and gentle; be patient, bearing with one another in love.",
    reference: "Ephesians 4:2",
  },
  {
    text: "I have found the one whom my soul loves.",
    reference: "Song of Solomon 3:4",
  },
  {
    text: "Therefore what God has joined together, let no one separate.",
    reference: "Mark 10:9",
  },
  {
    text: "Many waters cannot quench love; rivers cannot sweep it away.",
    reference: "Song of Solomon 8:7",
  },
];

export default function LoveScripture() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState<"in" | "out">("in");

  const cycleScripture = useCallback(() => {
    setAnimState("out");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SCRIPTURES.length);
      setAnimState("in");
    }, 600);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleScripture, 8000);
    return () => clearInterval(interval);
  }, [cycleScripture]);

  const scripture = SCRIPTURES[currentIndex];

  return (
    <div className="mb-10 px-2.5 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Love Scripture
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>

      <div
        className="relative rounded-2xl p-6 sm:p-8 min-h-[160px] flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #fffaf6, #fdf1f4)",
          border: "1px solid rgba(198, 161, 91, 0.3)",
          boxShadow: "0 12px 30px -12px rgba(71, 37, 54, 0.25)",
        }}
      >
        {/* Decorative quote mark */}
        <span
          className="absolute top-3 left-4 font-playfair text-5xl text-gold/20 leading-none select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <div
          key={currentIndex}
          className={
            animState === "in"
              ? "animate-scripture-in"
              : "animate-scripture-out"
          }
        >
          <p className="font-playfair italic text-[1.05rem] sm:text-lg leading-relaxed text-plum mb-3">
            &ldquo;{scripture.text}&rdquo;
          </p>
          <p className="font-marcellus text-[0.75rem] tracking-[0.15em] uppercase text-rose-gold/80">
            — {scripture.reference}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mt-4">
          {SCRIPTURES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAnimState("out");
                setTimeout(() => {
                  setCurrentIndex(i);
                  setAnimState("in");
                }, 300);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer p-0 ${
                i === currentIndex
                  ? "bg-rose-gold w-4"
                  : "bg-rose-gold/30 hover:bg-rose-gold/50"
              }`}
              aria-label={`Scripture ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
