import { useEffect, useState, useCallback } from "react";
import { useGetActiveHeroesQuery } from "../../../redux/Features/Hero/heroApi";
import HeroSkeletonLoader from "../../Loaders/HeroSkeletonLoader/HeroSkeletonLoader";
import Container from "../../Reusable/Container/Container";

const Hero = () => {
  const { data, isLoading } = useGetActiveHeroesQuery({});
  const heroes = data?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (heroes.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroes.length, isPaused]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[600px] font-Inter py-10">
          <HeroSkeletonLoader />
        </div>
      </Container>
    );
  }

  // No heroes available
  if (!heroes.length) return null;

  return (
    <Container>
      <div
        className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[600px] font-Inter py-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides — all images rendered, opacity toggled for smooth crossfade */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          {heroes.map((h: any, idx: number) => (
            <img
              key={h._id}
              src={h.image}
              alt={h.title || `Hero ${idx + 1}`}
              loading={idx === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>

        {/* Carousel Pointers (Dots) */}
        {heroes.length > 1 && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
            {heroes.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-primary-10"
                    : "w-2 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Hero;
