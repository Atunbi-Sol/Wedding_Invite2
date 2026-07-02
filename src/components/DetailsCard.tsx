export default function DetailsCard() {
  const handleAddToCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Olufunso & Modupe — Wedding Ceremony",
      "LOCATION:AB Grace Hotel, Ibafo, Ogun State",
      "DESCRIPTION:Wedding ceremony of Olufunso & Modupe. Reception follows immediately at the same venue.",
      "DTSTART:20260801T110000Z",
      "DTEND:20260801T170000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Olufunso-and-Modupe-Wedding.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="rounded-2xl p-7 pb-6 mb-9"
      style={{
        background: "linear-gradient(180deg, #fffaf6, #f5e1ee)",
        border: "1px solid rgba(198, 161, 91, 0.4)",
        boxShadow: "0 20px 45px -20px rgba(90, 24, 66, 0.45)",
      }}
    >
      {/* Date block */}
      <div className="flex items-baseline justify-center gap-2.5 font-playfair text-plum mb-4">
        <span className="text-lg font-medium">August</span>
        <span className="text-[2.1rem] font-bold text-rose">
          1<sup className="text-[0.5em]">st</sup>
        </span>
        <span className="text-lg font-medium">2026</span>
      </div>

      {/* Day */}
      <p className="font-marcellus uppercase tracking-[0.15em] text-[0.85rem] text-rose-gold mb-3">
        Saturday
      </p>

      {/* Ceremony pill */}
      <div
        className="inline-block text-cream px-6 py-2.5 rounded-full font-marcellus tracking-wider text-[0.85rem] uppercase mb-4"
        style={{
          background: "linear-gradient(135deg, #e3cd9a, #c6a15b)",
        }}
      >
        Wedding Ceremony
        <strong className="block font-playfair text-xl tracking-normal mt-0.5 normal-case">
          12:00 PM
        </strong>
      </div>

      {/* Venue */}
      <div className="mb-3">
        <p className="font-playfair font-bold text-xl text-plum uppercase tracking-wide m-0 mb-1">
          AB Grace Hotel
        </p>
        <p className="text-[0.95rem] text-ink/75 m-0">
          Ibafo, Ogun State
        </p>
      </div>

      {/* Reception note */}
      <p className="font-playfair italic text-[0.9rem] text-rose-gold/80 m-0 mb-5">
        Reception follows immediately @ the same venue
      </p>

      {/* Add to calendar */}
      <button
        onClick={handleAddToCalendar}
        id="calendar-btn"
        className="font-marcellus tracking-[0.12em] uppercase text-[0.72rem] bg-transparent border border-rose-gold text-rose-gold py-2.5 px-5 rounded-full cursor-pointer transition-all duration-300 hover:bg-rose-gold hover:text-cream focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        Add to calendar
      </button>
    </div>
  );
}
