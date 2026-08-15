import { GoHeart } from "react-icons/go";
import { ICONS, IMAGES } from "../../../assets";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <div className="rounded-lg">
      <div className="relative rounded-lg">
        <Link to="/product/1">
          <img
            src={IMAGES.wedding}
            alt=""
            className="rounded-lg w-full h-55 object-cover"
          />
        </Link>
        <button className="absolute top-3 right-3 bg-white border border-neutral-10/50 size-7 rounded-full flex items-center justify-center p-1">
          <GoHeart className="text-primary-10" />
          {/* <GoHeartFill /> */}
        </button>
        <div className="absolute left-3 top-3 bg-neutral-5 text-white text-[10px] rounded-3xl flex items-center justify-center px-3 py-1 w-fit">
          BRASS
        </div>
      </div>

      <div className="mt-2">
        <Link
          to="/product/1"
          className="font-semibold text-neutral-5 hover:underline"
        >
          The Jewel embedded Brass elephant
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <img src={ICONS.star} alt="" />
          <p className="text-xs text-neutral-10 uppercase flex items-center gap-2">
            4.5 (13)
            <span>|</span>
            <span>1K+ Sold</span>
          </p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <h3 className="font-semibold text-neutral-5">₹200</h3>

          <p className="text-red-500 text-xs mt-0.5">
            <span className="line-through">₹499</span> <span>-10%</span>
          </p>
        </div>
      </div>

      <button className="text-neutral-5 underline font-semibold text-sm uppercase font-Inter mt-2">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
