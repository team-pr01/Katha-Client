import { useEffect, useState, useCallback } from "react";
import { useGetActiveHeroesQuery } from "../../../redux/Features/Hero/heroApi";
import Button from "../../Reusable/Button/Button";
import HeroSkeletonLoader from "../../Loaders/HeroSkeletonLoader/HeroSkeletonLoader";

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

  if (isLoading) {
  return <HeroSkeletonLoader />;
}

  // No heroes available
  if (!heroes.length) return null;

  const hero = heroes[currentIndex];

  

  return (
    <div
      className="relative w-full h-screen overflow-hidden font-Inter"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images - All rendered, opacity toggled */}
      <div className="absolute top-0 left-0 w-full h-full">
        {heroes.map((h: any, idx: number) => (
          <div
            key={h._id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={h.image}
              alt={h.title}
              className="w-full h-full object-cover block"
            />
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: `linear-gradient(to bottom right, rgba(0,0,0,${
                  (h.overlayOpacity ?? 0.6) * 1.1
                }), rgba(0,0,0,${h.overlayOpacity ?? 0.3}), rgba(0,0,0,${
                  (h.overlayOpacity ?? 0.7) * 1.15
                }))`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Content Wrapper */}
      <div className="relative z-20 max-w-300 2xl:max-w-7xl w-full mx-auto px-5 2xl:px-0 h-full flex flex-col py-6 md:py-8 text-white">
        {/* Hero Text */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: hero.colors?.titleColor || "#FFFFFF" }}
          >
            {hero.title} <br />
            {hero.highlightedTitle && (
              <span
                className="relative"
                style={{ color: hero.colors?.subtitleColor || "#F59E0B" }}
              >
                {hero.highlightedTitle}
                <span
                  className="absolute -bottom-2 left-0 w-full h-0.5 rounded"
                  style={{
                    backgroundColor: hero.colors?.subtitleColor || "#F59E0B",
                  }}
                ></span>
              </span>
            )}
          </h1>

          <p
            className="leading-relaxed mt-8 mb-9"
            style={{
              color: hero.colors?.descriptionColor || "rgba(255,255,255,0.8)",
            }}
          >
            {hero.description}
          </p>

          <div className="flex gap-4">
            {hero.buttons?.map((btn: any, idx: number) => (
              <Button
                key={idx}
                variant={btn.variant === "primary" ? "primary" : "secondary"}
                label={btn.label}
                onClick={() => (window.location.href = btn.link)}
              />
            ))}
          </div>
        </div>

        {/* Carousel Pointers (Dots) */}
        {heroes.length > 1 && (
          <div className="flex justify-center gap-2 pb-4">
            {heroes.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-10 bg-primary-10"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
