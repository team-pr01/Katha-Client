import { FaWhatsapp } from "react-icons/fa";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  position?: "bottom-right" | "bottom-left";
}

const FloatingWhatsApp = ({
  phoneNumber = "919420784505",
  message = "Hi Katha Celebrations, I'd like to enquire about your products.",
  position = "bottom-right",
}: FloatingWhatsAppProps) => {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const positionClasses =
    position === "bottom-right"
      ? "bottom-5 right-5 md:bottom-6 md:right-6"
      : "bottom-5 left-5 md:bottom-6 md:left-6";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`
        fixed ${positionClasses} z-50
        size-14 rounded-full
        bg-[#25D366] text-white
        flex items-center justify-center
        shadow-lg shadow-[#25D366]/30
        hover:bg-[#1da851] hover:scale-110 hover:shadow-xl
        active:scale-95
        transition-all duration-300
        group
      `}
    >
      <FaWhatsapp size={28} />

      {/* Ping animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

      {/* Optional hover tooltip */}
      <span
        className="
          absolute right-full mr-3 top-1/2 -translate-y-1/2
          whitespace-nowrap bg-neutral-10 text-white text-xs font-medium
          px-3 py-1.5 rounded-lg
          opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200 pointer-events-none
          hidden md:block
        "
      >
        Chat with us
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
