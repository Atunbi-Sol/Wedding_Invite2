import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const IMAGES = [
  "/img/_SS_8172.jpg",
  "/img/_SS_8182.jpg",
  "/img/_SS_8185.jpg",
  "/img/_SS_8199.jpg",
  "/img/_SS_8202.jpg",
  "/img/_SS_8204.jpg",
  "/img/_SS_8218.jpg",
  "/img/_SS_8226.jpg",
  "/img/_SS_8259.jpg",
  "/img/_SS_8275.jpg",
  "/img/_SS_8286.jpg",
  "/img/_SS_8294.jpg",
  "/img/_SS_8302.jpg",
  "/img/_SS_8321.jpg",
  "/img/_SS_8332.jpg",
  "/img/_SS_8334.jpg",
  "/img/_SS_8341.jpg",
  "/img/_SS_8348.jpg",
  "/img/_SS_8350.jpg",
  "/img/_SS_8352.jpg",
  "/img/_SS_8408.jpg",
  "/img/_SS_8413.jpg",
  "/img/_SS_8422.jpg",
  "/img/_SS_8430.jpg",
  "/img/_SS_8439.jpg",
  "/img/_SS_8441.jpg",
  "/img/_SS_8526.jpg",
  "/img/_SS_8534.jpg",
  "/img/_SS_8545.jpg",
  "/img/_SS_8550.jpg",
  "/img/_SS_8553.jpg",
  "/img/_SS_8554.jpg",
  "/img/_SS_8556.jpg",
  "/img/_SS_8559.jpg",
  "/img/_SS_8577.jpg",
  "/img/_SS_8582.jpg",
  "/img/_SS_8583.jpg",
  "/img/_SS_8638.jpg",
  "/img/_SS_8642.jpg",
];

const AUTO_PLAY_INTERVAL = 4000; // 4 seconds

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const lightboxThumbStripRef = useRef<HTMLDivElement>(null);

  // Next slide helper
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  // Previous slide helper
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, nextSlide]);

  // Proactively preload surrounding images for buttery-smooth flicker-free transitions
  useEffect(() => {
    const indicesToPreload = [
      (currentIndex + 1) % IMAGES.length,
      (currentIndex + 2) % IMAGES.length,
      (currentIndex + 3) % IMAGES.length,
      (currentIndex - 1 + IMAGES.length) % IMAGES.length,
    ];
    indicesToPreload.forEach((idx) => {
      const img = new Image();
      img.src = IMAGES[idx];
    });
  }, [currentIndex]);

  // Keep thumbnail centered inside its container (without scrolling the main page window)
  useEffect(() => {
    const scrollToThumb = (container: HTMLDivElement | null) => {
      if (!container) return;
      const activeThumb = container.children[currentIndex] as HTMLElement;
      if (!activeThumb) return;

      const targetLeft = activeThumb.offsetLeft - container.clientWidth / 2 + activeThumb.offsetWidth / 2;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    };

    scrollToThumb(thumbStripRef.current);
    if (isLightboxOpen) {
      scrollToThumb(lightboxThumbStripRef.current);
    }
  }, [currentIndex, isLightboxOpen]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, nextSlide, prevSlide]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="mb-12 w-full">
      {/* Container Card */}
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-plum/15 shadow-[0_10px_35px_rgba(90,24,66,0.1)] transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="font-marcellus uppercase tracking-[0.25em] text-[0.7rem] text-rose-gold mb-1">
            Pre-Wedding Gallery
          </p>
          <h2 className="font-great-vibes text-3xl sm:text-4xl text-plum font-normal m-0">
            Moments of Love
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2" />
        </div>

        {/* Main Carousel Display Frame */}
        <div
          className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[580px] rounded-2xl overflow-hidden group cursor-pointer shadow-inner bg-plum/5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Main Image with Ken Burns Zoom Out & Cross-Fade */}
          {IMAGES.map((src, index) => {
            const isActive = index === currentIndex;
            return (
              <img
                key={src}
                src={src}
                alt={`Pre-wedding photo ${index + 1}`}
                loading={index < 5 ? "eager" : "lazy"}
                style={{
                  animation: isActive
                    ? `kenBurnsZoomOut ${AUTO_PLAY_INTERVAL + 600}ms cubic-bezier(0.25, 1, 0.5, 1) forwards`
                    : "none",
                  animationPlayState: isPlaying && !isHovered ? "running" : "paused",
                  willChange: "transform, opacity",
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                  }`}
              />
            );
          })}

          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-black/20 z-10 opacity-70 group-hover:opacity-90 transition-opacity" />

          {/* Top Bar inside Image Frame */}
          <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
            {/* Counter Badge */}
            <span className="bg-plum/70 text-cream backdrop-blur-md px-3 py-1 rounded-full text-xs font-marcellus tracking-widest border border-gold-soft/30 shadow-sm">
              {currentIndex + 1} / {IMAGES.length}
            </span>

            {/* Tap to expand hint */}
            <span className="bg-plum/70 text-cream backdrop-blur-md px-3 py-1 rounded-full text-xs font-playfair italic flex items-center gap-1.5 border border-gold-soft/30 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3.5 h-3.5 fill-gold-soft" viewBox="0 0 24 24">
                <path d="M15 3h6v6h-2V5.414l-4.293 4.293-1.414-1.414L17.586 5H15V3zM9 21H3v-6h2v3.586l4.293-4.293 1.414 1.414L6.414 19H9v2z" />
              </svg>
              Tap to Expand
            </span>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-cream/80 hover:bg-cream text-plum backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 transform -translate-x-2 opacity-80 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-cream/80 hover:bg-cream text-plum backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 transform translate-x-2 opacity-80 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hover:scale-110 active:scale-95"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          {/* Bottom Bar: Auto-Play Indicator & Play/Pause Controls */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-auto">
            {/* Progress Bar Container */}
            <div className="flex-1 h-1.5 bg-cream/30 backdrop-blur-sm rounded-full overflow-hidden">
              <div
                key={`${currentIndex}-${isPlaying}-${isHovered}`}
                className="h-full bg-gradient-to-r from-gold-soft to-gold rounded-full"
                style={{
                  animation: isPlaying && !isHovered ? `galleryProgress ${AUTO_PLAY_INTERVAL}ms linear forwards` : "none",
                  width: isPlaying && !isHovered ? "100%" : "0%",
                }}
              />
            </div>

            {/* Play/Pause Toggle Button */}
            <button
              type="button"
              aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="w-8 h-8 rounded-full bg-plum/80 hover:bg-plum text-gold-soft border border-gold/40 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-md"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div className="mt-4 relative">
          <div
            ref={thumbStripRef}
            className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin scroll-smooth focus:outline-none"
            tabIndex={0}
            role="region"
            aria-label="Photo thumbnails"
          >
            {IMAGES.map((src, idx) => (
              <button
                key={`thumb-${src}`}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-300 border-2 ${idx === currentIndex
                  ? "border-rose-gold scale-105 shadow-md ring-2 ring-gold/40 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-90 hover:scale-100"
                  }`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {isLightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/92 backdrop-blur-xl animate-fade-in-up cursor-pointer select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Lightbox Header Controls */}
            <div
              className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8 bg-gradient-to-b from-black/80 to-transparent cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Slide Counter */}
              <div className="flex items-center gap-3">
                <span className="font-marcellus tracking-widest text-cream text-sm bg-plum/70 px-3.5 py-1.5 rounded-full border border-gold-soft/30">
                  {currentIndex + 1} / {IMAGES.length}
                </span>
                <span className="hidden sm:inline font-playfair italic text-cream/70 text-sm">
                  Modupe &amp; Olufunso
                </span>
              </div>

              {/* Actions: Play/Pause + Close */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-all flex items-center gap-2 text-xs font-marcellus uppercase tracking-wider cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close modal"
                  className="w-10 h-10 rounded-full bg-rose-gold/80 hover:bg-rose-gold text-cream flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Lightbox Main Image Frame */}
            <div
              className="relative flex-1 flex items-center justify-center p-2 sm:p-6 select-none overflow-hidden cursor-pointer"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-full bg-plum/70 hover:bg-plum text-gold-soft border border-gold/30 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>

              {/* Current Image Stack with Cross-Fade */}
              <div className="relative w-full h-full max-w-full max-h-[78vh] flex items-center justify-center pointer-events-none">
                {IMAGES.map((src, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <img
                      key={`lb-${src}`}
                      src={src}
                      alt={`Full screen view ${idx + 1}`}
                      style={{
                        willChange: "transform, opacity",
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl transition-all duration-700 ease-in-out pointer-events-auto cursor-default ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"
                        }`}
                    />
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-full bg-plum/70 hover:bg-plum text-gold-soft border border-gold/30 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>

            {/* Lightbox Footer Thumbnail Strip */}
            <div
              className="relative z-10 px-4 py-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={lightboxThumbStripRef}
                className="flex gap-2 overflow-x-auto justify-start sm:justify-center max-w-5xl mx-auto py-1 scrollbar-thin"
              >
                {IMAGES.map((src, idx) => (
                  <button
                    key={`lb-thumb-${src}`}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${idx === currentIndex
                      ? "border-gold scale-110 opacity-100 shadow-lg ring-2 ring-rose-gold"
                      : "border-transparent opacity-40 hover:opacity-80"
                      }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
