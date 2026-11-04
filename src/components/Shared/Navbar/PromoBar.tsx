import { useRef } from "react";

const PromoBar = () => {
  const messages = [
    "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
    "Free shipping on orders above ₹999",
    "Handcrafted with love — new arrivals every week!",
  ];

  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-primary-10 font-Manrope overflow-hidden">
      <div className="py-1 relative flex items-center">
        {/* Marquee track */}
        <div
          ref={trackRef}
          className="flex whitespace-nowrap animate-marquee"
          aria-label="Promotional announcements"
        >
          {/* Render content twice for seamless loop */}
          {[...messages, ...messages].map((msg, i) => (
            <span
              key={i}
              className="text-xs text-white mx-8 inline-flex items-center gap-8"
            >
              {msg}
              <span className="inline-block size-1 rounded-full bg-white/60" />
            </span>
          ))}
        </div>

        {/* Left/right fade edges (optional, nice touch) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-primary-10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-primary-10 to-transparent" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        /* Pause on hover for accessibility */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Respect reduced-motion users */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            transform: none;
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
};

export default PromoBar;