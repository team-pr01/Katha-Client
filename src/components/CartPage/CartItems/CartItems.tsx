import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { type TCartItem } from "../../../providers/CartProvider/CartProvider";
import CartItemCard from "../CartItemCard/CartItemCard";
import OrderSummary from "../OrderSummary/OrderSummary";

const CartItems = ({ cartItems }: { cartItems: TCartItem[] }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Cart Items */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white border-b border-neutral-50 text-sm font-semibold text-neutral-45">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-1 text-center">Total</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Items */}
          {cartItems?.map((item: TCartItem) => (
            <CartItemCard item={item} />
          ))}

          {/* Continue Shopping */}
          <div className="px-4 md:px-6 py-4 bg-neutral-20 border-t border-neutral-50">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-10 hover:text-[#d4892a] transition-colors"
            >
              <FiArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <OrderSummary />
    </div>
  );
};

export default CartItems;
