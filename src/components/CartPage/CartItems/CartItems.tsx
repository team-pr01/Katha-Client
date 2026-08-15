import { useState } from "react";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiGift,
  FiTruck,
  FiShield,
  FiArrowLeft,
  FiArrowRight,
  FiX,
  FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const CartItems = ({ cartItems }) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  const [appliedCoupon, setAppliedCoupon] = useState<null>(null);

  const handleQuantityChange = (id: string, delta: number): void => {
    // Update the quantity of the cart item
  };

  const handleRemoveItem = (id: string): void => {
    // Remove the cart item from the cart
  };

  const handleApplyCoupon = (): void => {
    // Apply the coupon
  };

  const handleRemoveCoupon = (): void => {
    // Remove the coupon
  };

  const totalSavings = 100;
  const discount = 200;
  const deliveryCharge = 50;
  const total = 2000;

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
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="px-4 md:px-6 py-4 border-b border-neutral-50 last:border-0 hover:bg-neutral-20/50 transition-colors"
            >
              <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-3 items-center">
                {/* Product Info */}
                <div className="flex items-center gap-4 col-span-6 w-full">
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover bg-neutral-20 hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
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
                      {item.color && (
                        <span className="text-xs text-neutral-45">
                          Color: {item.color}
                        </span>
                      )}
                      {!item.inStock && (
                        <span className="text-xs text-red-500 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <div className="text-sm font-bold text-neutral-10">
                    ₹{item.price}
                  </div>
                  {item.originalPrice && (
                    <div className="text-xs text-neutral-45 line-through">
                      ₹{item.originalPrice}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <div className="flex items-center border border-neutral-50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
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
                      onClick={() => handleQuantityChange(item.id, 1)}
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
                  ₹{item.price * item.quantity}
                </div>

                {/* Action */}
                <div className="col-span-1 flex justify-center md:justify-end gap-2">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
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
      <div className="lg:w-96 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
          <h2 className="text-lg font-semibold text-neutral-10 mb-4">
            Order Summary
          </h2>

          {/* Coupon */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 border border-neutral-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                aria-label="Coupon code"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-primary-10 text-white rounded-lg text-sm font-medium hover:bg-[#d4892a] transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-xs text-red-500 mt-1">{couponError}</p>
            )}
            {appliedCoupon && (
              <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-lg">
                <div>
                  <span className="text-xs font-medium text-green-700">
                    {appliedCoupon.code} applied
                  </span>
                  <span className="text-xs text-green-600 ml-2">
                    {appliedCoupon.discount}% off
                  </span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-green-600 hover:text-red-500 transition-colors"
                  aria-label="Remove coupon"
                >
                  <FiX size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Calculations */}
          <div className="space-y-3 border-b border-neutral-50 pb-4">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-45">Subtotal (5 items)</span>
              <span className="text-neutral-10 font-medium">₹1000</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Total Savings</span>
                <span className="text-green-600 font-medium">
                  -₹{totalSavings}
                </span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Coupon Discount</span>
                <span className="text-green-600 font-medium">
                  -₹{discount.toFixed(0)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-neutral-45">Delivery Charges</span>
              <span
                className={
                  deliveryCharge === 0
                    ? "text-green-600 font-medium"
                    : "text-neutral-10"
                }
              >
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 mb-4">
            <span className="text-base font-semibold text-neutral-10">
              Total
            </span>
            <span className="text-2xl font-bold text-neutral-10">
              ₹{total.toFixed(0)}
            </span>
          </div>

          {/* Checkout Button */}
          <Link to="/checkout" className="w-full py-3 bg-primary-10 text-white text-sm rounded-xl font-medium hover:bg-[#d4892a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            Proceed to Checkout
            <FiArrowRight size={18} />
          </Link>

          {/* Trust Badges */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
              <FiTruck className="text-primary-10 text-lg" />
              <span className="text-xs text-neutral-45 mt-1 text-center">
                Free Delivery
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
              <FiShield className="text-primary-10 text-lg" />
              <span className="text-xs text-neutral-45 mt-1 text-center">
                Secure Payment
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
              <FiGift className="text-primary-10 text-lg" />
              <span className="text-xs text-neutral-45 mt-1 text-center">
                Gift Options
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
