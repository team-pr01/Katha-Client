import { GoHeart } from "react-icons/go";
import { ICONS } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
import type { TProduct } from "../../../types/product.type";
import { calculateProductDiscountedPercentage } from "../../../utils/calculateProductDiscountedPercentage";
import { useCart } from "../../../providers/CartProvider/CartProvider";

const ProductCard = ({ product }: { product: TProduct }) => {
  const navigate  = useNavigate();
  const { _id, basePrice, discountedPrice, images, size, color, stock } =
    product?.variants[0];
  const { addToCart } = useCart();

  const handleAddProductToCart = () => {
    const payload = {
      productId: product?._id,
      variantId: _id,
      name: product?.name,
      image: images?.[0] || "",
      basePrice: basePrice as number,
      discountedPrice: discountedPrice as number,
      category: product?.category,
      size: size ?? "",
      color: color ?? "",
      quantity: 1,
      maxQuantity: stock ?? 0,
      packagingStyle: "regular",
      packagingStylePrice: 0,
    };
    addToCart(payload);
    navigate("/cart");
  };

  return (
    <div className="rounded-lg">
      <div className="relative rounded-lg">
        <Link to={`/product/${product?.slug}`}>
          <img
            src={images[0]}
            alt=""
            className="rounded-lg w-full h-55 object-cover"
          />
        </Link>
        <button className="absolute top-3 right-3 bg-white border border-neutral-10/50 size-7 rounded-full flex items-center justify-center p-1">
          <GoHeart className="text-primary-10" />
          {/* <GoHeartFill /> */}
        </button>
        <div className="absolute left-3 top-3 bg-neutral-5 text-white text-[10px] rounded-3xl flex items-center justify-center px-3 py-1 w-fit">
          {product?.category}
        </div>
      </div>

      <div className="mt-2">
        <Link
          to={`/product/${product?.slug}`}
          className="font-semibold text-neutral-5 hover:underline"
        >
          {product?.name}
        </Link>

        <div className="flex items-center gap-1 mt-2">
          <img src={ICONS.star} alt="" />
          <p className="text-xs text-neutral-10 uppercase flex items-center gap-2">
            {product?.averageRating} ({product?.totalReviews})<span>|</span>
            <span>{product?.soldCount} Sold</span>
          </p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <h3 className="font-semibold text-neutral-5">₹{discountedPrice}</h3>

          <p className="text-red-500 text-xs mt-0.5">
            <span className="line-through">₹{basePrice}</span>{" "}
            <span className="text-green-600 font-semibold">
              -
              {calculateProductDiscountedPercentage(basePrice, discountedPrice)}
              %
            </span>
          </p>
        </div>
      </div>

      <button onClick={handleAddProductToCart} className="text-neutral-5 underline font-semibold text-sm uppercase font-Inter mt-2">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
