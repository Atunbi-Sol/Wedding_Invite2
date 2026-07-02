import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-08-01T12:00:00+01:00");

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #fffaf6, #f5e1ee)",
          border: "1px solid rgba(198, 161, 91, 0.35)",
          boxShadow:
            "0 8px 20px -8px rgba(90, 24, 66, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        }}
      >
        {/* Center divider line */}
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(198, 161, 91, 0.2), transparent)",
          }}
        />
        <span className="font-playfair font-bold text-3xl sm:text-4xl text-plum tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-marcellus uppercase tracking-[0.2em] text-[0.6rem] text-rose-gold mt-2">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const updateTime = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  if (!timeLeft) {
    return (
      <div className="mb-10 text-center">
        <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
          <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
          Counting Down
          <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
        </p>
        <div className="flex justify-center gap-3 sm:gap-4">
          {["Days", "Hours", "Mins", "Secs"].map((label) => (
            <TimeUnit key={label} value={0} label={label} />
          ))}
        </div>
      </div>
    );
  }

  const isPast =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isPast) {
    return (
      <div className="mb-10 text-center">
        <p className="font-playfair italic text-xl text-plum animate-pulse-soft">
          🎉 The celebration has begun! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Counting Down
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>
      <div className="flex justify-center gap-3 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
}
