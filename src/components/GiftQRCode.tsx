export default function GiftQRCode() {
  // Use a simple, scanner-friendly string format
  const bankText = "Sterling Bank - 0092949662 - Olufunso Oladiran";
  const qrData = encodeURIComponent(bankText);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&color=5A1842&bgcolor=FFFAF6&data=${qrData}`;

  return (
    <div className="mb-10 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Gift The Couple
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>

      <div
        className="rounded-2xl p-6 sm:p-7 mx-auto max-w-[380px]"
        style={{
          background: "linear-gradient(180deg, #fffaf6, #f5e1ee)",
          border: "1px solid rgba(198, 161, 91, 0.4)",
          boxShadow: "0 20px 45px -20px rgba(90, 24, 66, 0.35)",
        }}
      >
        <p className="font-playfair italic text-[1rem] text-plum/80 m-0 mb-5">
          Scan the QR code below to view bank details
        </p>

        {/* QR Code */}
        <div
          className="inline-block rounded-xl p-4 mb-5"
          style={{
            background: "#fffaf6",
            border: "1px solid rgba(198, 161, 91, 0.3)",
            boxShadow: "0 4px 15px -4px rgba(90, 24, 66, 0.15)",
          }}
        >
          <img
            src={qrUrl}
            alt="QR Code with bank details for Sterling Bank - 0092949662 - Olufunso Oladiran"
            width={200}
            height={200}
            className="block"
            loading="lazy"
          />
        </div>

        {/* Bank Details Text */}
        <div
          className="rounded-xl p-4 text-left"
          style={{
            background: "linear-gradient(180deg, rgba(90, 24, 66, 0.06), rgba(142, 36, 99, 0.08))",
            border: "1px solid rgba(198, 161, 91, 0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold flex-shrink-0"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span className="font-marcellus uppercase tracking-[0.15em] text-[0.7rem] text-rose-gold">
              Bank Details
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-[0.88rem] text-plum m-0">
              <span className="text-ink/60">Bank:</span>{" "}
              <strong className="font-semibold">Sterling Bank</strong>
            </p>
            <p className="text-[0.88rem] text-plum m-0">
              <span className="text-ink/60">Account No:</span>{" "}
              <strong className="font-semibold font-playfair tracking-wide">0092949662</strong>
            </p>
            <p className="text-[0.88rem] text-plum m-0">
              <span className="text-ink/60">Account Name:</span>{" "}
              <strong className="font-semibold">Olufunso Oladiran</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
