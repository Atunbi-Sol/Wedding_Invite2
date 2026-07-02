export default function VenueMap() {
  const mapQuery = encodeURIComponent(
    "AB Grace Hotel, Ibafo, Ogun State, Nigeria"
  );

  return (
    <div className="mb-10 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Venue
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>

      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          border: "1px solid rgba(198, 161, 91, 0.3)",
          boxShadow: "0 12px 30px -12px rgba(90, 24, 66, 0.25)",
        }}
      >
        <iframe
          title="Venue Map"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`}
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block"
        />
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-marcellus tracking-[0.12em] uppercase text-[0.72rem] bg-transparent border border-rose-gold text-rose-gold py-2.5 px-5 rounded-full cursor-pointer transition-all duration-300 hover:bg-rose-gold hover:text-cream no-underline"
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
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Get Directions
      </a>
    </div>
  );
}
