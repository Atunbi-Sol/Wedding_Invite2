import { useState, useCallback } from "react";
import Petals from "@/components/Petals";
import Envelope from "@/components/Envelope";
import Monogram from "@/components/Monogram";
import RevealSection from "@/components/RevealSection";
import DetailsCard from "@/components/DetailsCard";
import CountdownTimer from "@/components/CountdownTimer";
import DressCode from "@/components/DressCode";
import LoveScripture from "@/components/LoveScripture";
import VenueMap from "@/components/VenueMap";
import RsvpSection from "@/components/RsvpSection";
import MusicPlayer from "@/components/MusicPlayer";
import ShareButton from "@/components/ShareButton";
import AccessCard from "@/components/AccessCard";
import GiftQRCode from "@/components/GiftQRCode";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [stageHidden, setStageHidden] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);

    setTimeout(() => {
      setStageHidden(true);
    }, 650);

    setTimeout(() => {
      setShowInvite(true);
      window.scrollTo(0, 0);
    }, 1350);
  }, []);

  return (
    <>
      <Petals />
      <MusicPlayer />

      {/* Envelope Stage */}
      {!showInvite && (
        <section
          className="relative min-h-screen flex flex-col items-center justify-center gap-7 p-6 z-[2] transition-all duration-700 ease-in-out"
          style={{
            opacity: stageHidden ? 0 : 1,
            transform: stageHidden ? "scale(0.96)" : "scale(1)",
            pointerEvents: stageHidden ? "none" : "auto",
          }}
        >
          <p className="font-playfair font-medium italic tracking-wide text-plum text-[1.15rem] text-center opacity-85">
            You have a letter from Olufunso &amp; Modupe
          </p>

          <Envelope isOpen={isOpen} onOpen={handleOpen} />

          <p
            className="font-marcellus tracking-[0.25em] uppercase text-[0.72rem] text-plum transition-opacity duration-400 ease-in-out"
            style={{ opacity: isOpen ? 0 : 0.65 }}
          >
            tap the seal to open
          </p>
        </section>
      )}

      {/* Invitation Content */}
      {showInvite && (
        <main
          className="relative z-[2] min-h-screen flex justify-center py-16 px-5 pb-24 animate-fade-in-up"
          id="invite"
        >
          <div className="w-full max-w-[520px] text-center">
            {/* Crest */}
            <RevealSection as="header" className="mb-8">
              <Monogram />
              <p className="font-marcellus uppercase tracking-[0.3em] text-[0.72rem] text-rose-gold">
                #M&apos;O 2026
              </p>
            </RevealSection>

            {/* Families */}
            <RevealSection className="mb-9" delay={100}>
              <p className="font-playfair italic font-medium text-xl text-rose-gold m-0 mb-2.5">
                The Families Of
              </p>
              <p className="text-[1.05rem] font-semibold tracking-wide text-plum m-0 mb-1.5 leading-relaxed">
                Mr and Mrs Tijani
              </p>
              <p className="font-playfair italic text-gold m-0 mb-0.5 text-base">
                &amp;
              </p>
              <p className="text-[1.05rem] font-semibold tracking-wide text-plum m-0 mb-1.5 leading-relaxed">
                Mr and Mrs Oladiran
              </p>
              <p className="text-base text-ink/85 m-0 mt-4">
                request the honour of your presence at the
              </p>
              <p className="font-playfair italic text-[1.35rem] text-rose m-0 mt-1.5">
                Wedding Ceremony
              </p>
              <p className="font-marcellus uppercase tracking-[0.2em] text-[0.72rem] text-plum/70 mt-2.5">
                of their children
              </p>
            </RevealSection>

            {/* Couple Names */}
            <RevealSection className="mb-10" delay={200}>
              <h1
                className="font-great-vibes font-normal text-plum m-0 leading-[1.15]"
                style={{ fontSize: "clamp(3rem, 14vw, 4.6rem)" }}
              >
                <span className="block">Modupe</span>
                <span className="block text-[0.45em] text-gold -my-1.5">
                  &amp;
                </span>
                <span className="block">Olufunso</span>
              </h1>
            </RevealSection>

            {/* Countdown */}
            <RevealSection delay={300}>
              <CountdownTimer />
            </RevealSection>

            {/* Details Card */}
            <RevealSection delay={400}>
              <DetailsCard />
            </RevealSection>

            {/* Venue Map */}
            <RevealSection delay={100}>
              <VenueMap />
            </RevealSection>

            {/* Access Card (downloadable) */}
            <RevealSection delay={100}>
              <AccessCard />
            </RevealSection>

            {/* Dress Code */}
            <RevealSection delay={100}>
              <DressCode />
            </RevealSection>

            {/* Gift QR Code */}
            <RevealSection delay={100}>
              <GiftQRCode />
            </RevealSection>

            {/* Love Scripture */}
            <RevealSection delay={100}>
              <LoveScripture />
            </RevealSection>

            {/* Original Quote */}
            <RevealSection className="mb-10 px-2.5" delay={100}>
              <p className="font-playfair italic text-[1.1rem] leading-relaxed text-plum">
                &ldquo;Two hearts, one promise &mdash; thank you for celebrating
                this new beginning with us.&rdquo;
              </p>
            </RevealSection>

            {/* RSVP */}
            <RevealSection delay={100}>
              <RsvpSection />
            </RevealSection>

            {/* Share */}
            <RevealSection className="mb-10" delay={100}>
              <ShareButton />
            </RevealSection>

            {/* Footer */}
            <RevealSection as="footer" className="opacity-90">
              <Monogram small />
              <p className="font-marcellus uppercase tracking-[0.2em] text-[0.6rem] text-rose-gold/60 mt-4">
                #M&apos;O 2026 &bull; with love
              </p>
            </RevealSection>
          </div>
        </main>
      )}
    </>
  );
}
