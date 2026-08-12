import { Link } from "react-router-dom";

const PromoBar = () => {
  return (
    <div className="bg-primary-10 font-Manrope">
      <div className="py-1 flex items-center justify-center text-center text-xs gap-3 max-w-7xl mx-auto text-white">

          <p className="leading-[21px]">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <Link to={"/"} className="font-semibold leading-6 underline">
            Shop Now
          </Link>
      </div>
    </div>
  );
};

export default PromoBar;
