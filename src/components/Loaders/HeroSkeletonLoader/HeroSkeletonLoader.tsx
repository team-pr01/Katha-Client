const HeroSkeletonLoader = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-Inter bg-white">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-20 via-neutral-50 to-neutral-20 animate-pulse" />

      {/* Content wrapper — matches real Hero layout */}
      <div className="relative z-20 max-w-300 2xl:max-w-7xl w-full mx-auto px-5 2xl:px-0 h-full flex flex-col py-6 md:py-8">
        {/* Hero Text */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          {/* Title — two lines */}
          <div className="space-y-4 animate-pulse">
            <div className="h-9 sm:h-11 md:h-14 lg:h-16 w-[85%] max-w-xl bg-neutral-20 rounded-xl" />
            <div className="h-9 sm:h-11 md:h-14 lg:h-16 w-[60%] max-w-md bg-neutral-20 rounded-xl" />
          </div>

          {/* Description — three lines */}
          <div className="mt-8 mb-9 space-y-3 animate-pulse">
            <div className="h-4 w-full max-w-lg bg-neutral-20 rounded-lg" />
            <div className="h-4 w-[90%] max-w-md bg-neutral-20 rounded-lg" />
            <div className="h-4 w-[70%] max-w-sm bg-neutral-20 rounded-lg" />
          </div>

          {/* Buttons — two */}
          <div className="flex gap-4 animate-pulse">
            <div className="h-12 w-36 bg-neutral-20 rounded-xl" />
            <div className="h-12 w-36 bg-neutral-20 rounded-xl" />
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-2 pb-4 animate-pulse">
          <div className="h-1.5 w-10 bg-neutral-45/40 rounded-full" />
          <div className="h-1.5 w-3 bg-neutral-20 rounded-full" />
          <div className="h-1.5 w-3 bg-neutral-20 rounded-full" />
          <div className="h-1.5 w-3 bg-neutral-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeletonLoader;