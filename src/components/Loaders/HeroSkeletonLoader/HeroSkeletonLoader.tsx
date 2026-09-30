const HeroSkeletonLoader = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl bg-neutral-20">
      {/* Background gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-20 via-neutral-50 to-neutral-20 animate-pulse" />

      {/* Carousel dots placeholder — bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/10">
        <div className="h-1.5 w-8 bg-neutral-45/40 rounded-full" />
        <div className="h-1.5 w-2 bg-neutral-20 rounded-full" />
        <div className="h-1.5 w-2 bg-neutral-20 rounded-full" />
        <div className="h-1.5 w-2 bg-neutral-20 rounded-full" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSkeletonLoader;