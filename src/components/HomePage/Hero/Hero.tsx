import { IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-Inter">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={IMAGES.heroImg}
          alt="Diwali Celebration"
          className="w-full h-full object-cover block"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-black/60 via-black/30 to-black/70"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-300 2xl:max-w-7xl w-full mx-auto px-5 2xl:px-0 h-full flex flex-col py-6 md:py-8 text-white">
        {/* Hero Text */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Celebrate Diwali <br />
            <span className="text-primary-10 relative">
              With Artisan Diyas
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary-10 rounded"></span>
            </span>
          </h1>

          <p className="leading-relaxed text-white/80 mt-8 mb-9">
            Timeless craftsmanship, festive elegance, and exclusive Diwali
            offers — curated to make every celebration extraordinary.
          </p>

          <div className="flex gap-4">
            <Button variant="secondary" label="See More" />
            <Button label="Shop Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
