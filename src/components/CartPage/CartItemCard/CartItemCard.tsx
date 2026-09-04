import { Link } from "react-router-dom";
import {
  useCart,
  type TCartItem,
} from "../../../providers/CartProvider/CartProvider";
import { FiHeart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItemCard = ({ item }: { item: TCartItem }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  return (
    <div className="px-4 md:px-6 py-4 border-b border-neutral-50 last:border-0 hover:bg-neutral-20/50 transition-colors">
      <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-3 items-center">
        {/* Product Info */}
        <div className="flex items-center gap-4 col-span-6 w-full">
          <Link to={`/product/${item?.productId}`} className="shrink-0">
            <img
              src={item?.image}
              alt={item?.name}
              className="w-20 h-20 rounded-lg object-cover bg-neutral-20 hover:opacity-80 transition-opacity"
              loading="lazy"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              to={`/product/${item?.productId}`}
              className="text-sm font-medium text-neutral-10 hover:text-primary-10 transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {item.size && (
                <span className="text-xs text-neutral-45">
                  Size: {item.size}
                </span>
              )}
              <div className="size-1 rounded-full bg-neutral-45/80"></div>
              {item.color && (
                <span className="text-xs text-neutral-45">
                  Color: {item.color}
                </span>
              )}
              <div className="size-1 rounded-full bg-neutral-45/80"></div>
              {item.packagingStyle && (
                <span className="text-xs text-neutral-45 capitalize">
                  Packaging: {item.packagingStyle} (₹{item.packagingStylePrice})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 text-center">
          <div className="text-sm font-bold text-neutral-10">
            ₹{item?.discountedPrice}
          </div>
          {item.basePrice && (
            <div className="text-xs text-neutral-45 line-through">
              ₹{item.basePrice}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div className="col-span-2 flex items-center justify-center gap-2">
          <div className="flex items-center border border-neutral-50 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                handleQuantityUpdate(item.productId, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="px-2.5 py-1 hover:bg-neutral-20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <FiMinus size={14} />
            </button>
            <span className="px-3 py-1 min-w-7.5 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                handleQuantityUpdate(item.productId, item.quantity + 1)
              }
              disabled={item.quantity >= item.maxQuantity}
              className="px-2.5 py-1 hover:bg-neutral-20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <FiPlus size={14} />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="col-span-1 text-center font-bold text-neutral-10">
          ₹
          {(item?.discountedPrice * item?.quantity) + (item?.packagingStylePrice ||
            0)}
        </div>

        {/* Action */}
        <div className="col-span-1 flex justify-center md:justify-end gap-2">
          <button
            onClick={() => removeFromCart(item.productId)}
            className="p-1.5 text-neutral-45 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove item"
          >
            <FiTrash2 size={18} />
          </button>
          <button
            className="p-1.5 text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 rounded-lg transition-colors"
            aria-label="Add to wishlist"
          >
            <FiHeart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
