export default function DressCode() {
  return (
    <div className="mb-10 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Color of The Day
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>

      <div className="flex items-center justify-center gap-6 sm:gap-7">
        {/* White */}
        <div className="flex flex-col items-center gap-2.5">
          <Swatch color="#fdfaf6" border="#e7d9c9" />
          <span className="text-[0.85rem] text-ink/75">White</span>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-gold/40" />

        {/* Magenta Purple */}
        <div className="flex flex-col items-center gap-2.5">
          <Swatch color="#c2185b" />
          <span className="text-[0.85rem] text-ink/75">Magenta Purple</span>
        </div>
      </div>
    </div>
  );
}

function Swatch({
  color,
  border,
}: {
  color: string;
  border?: string;
}) {
  return (
    <div
      className="w-11 h-11 rounded-full"
      style={{
        background: color,
        border: border ? `1px solid ${border}` : "none",
        boxShadow:
          "0 4px 10px rgba(90, 24, 66, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
      }}
    />
  );
}
