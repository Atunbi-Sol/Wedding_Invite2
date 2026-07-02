interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <div
      className="w-[min(340px,82vw)] relative"
      style={{
        aspectRatio: "3 / 2",
        perspective: "1400px",
        filter: "drop-shadow(0 25px 30px rgba(90, 24, 66, 0.4))",
      }}
    >
      {/* Back */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          background: "linear-gradient(160deg, #7a2048, #5a1842)",
          boxShadow: "inset 0 0 0 1px rgba(198, 161, 91, 0.4)",
        }}
      />

      {/* Front */}
      <div
        className="absolute left-0 bottom-0 w-full rounded-b-md z-[2]"
        style={{
          height: "78%",
          background: "linear-gradient(155deg, #6b1d4a, #4a1035)",
          clipPath: "polygon(0 100%, 0 22%, 50% 58%, 100% 22%, 100% 100%)",
        }}
      >
        {/* Gold line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[70%] h-px opacity-70"
          style={{
            top: "14%",
            background:
              "linear-gradient(90deg, transparent, #e3cd9a, transparent)",
          }}
        />
      </div>

      {/* Flap */}
      <div
        className="absolute top-0 left-0 w-full z-[3] transition-transform duration-[1100ms]"
        style={{
          height: "58%",
          background: "linear-gradient(200deg, #8e2463, #5a1842)",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
          boxShadow: "inset 0 -1px 0 rgba(198, 161, 91, 0.4)",
          transitionTimingFunction: "cubic-bezier(0.6, 0, 0.4, 1)",
        }}
      />

      {/* Seal button */}
      <button
        onClick={onOpen}
        disabled={isOpen}
        aria-label="Open the invitation"
        className="absolute z-[5] cursor-pointer flex items-center justify-center p-0 border-none transition-all duration-500 ease-in-out"
        style={{
          top: "38%",
          left: "50%",
          transform: isOpen
            ? "translate(-50%, -50%) scale(0.4) rotate(25deg)"
            : "translate(-50%, -50%)",
          width: "78px",
          height: "78px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #e3cd9a, #c6a15b 70%)",
          boxShadow:
            "0 8px 18px rgba(90, 24, 66, 0.5), inset 0 0 0 2px rgba(255, 255, 255, 0.25)",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
      >
        <span className="font-playfair font-semibold text-[1.05rem] text-plum tracking-wide">
          M<span className="text-[0.8em] px-0.5 text-wine">&amp;</span>O
        </span>
      </button>
    </div>
  );
}
