import { FiArrowRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import { useValidateCouponCodeMutation } from "../../../redux/Features/CouponCode/couponCodeApi";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const { cartItems, getSubTotal, getPackagingTotal } = useCart();

  const [validateCouponCode, { isLoading: isValidating }] =
    useValidateCouponCodeMutation();
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const [discount, setDiscount] = useState<number>(0);

  const handleValidateCouponCode = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code first");
      return;
    }

    try {
      const payload = { code: couponCode };
      const response = await validateCouponCode(payload).unwrap();
      if (response?.success) {
        setAppliedCoupon(response?.data);
        setDiscount(response?.data?.discountPercentage || 0);
        setCouponCode("");
        setCouponError("");
      }
    } catch (error: any) {
      setCouponError(error?.data?.message || "This coupon code is invalid.");
    }
  };

  const handleRemoveCoupon = (): void => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode("");
    setCouponError("");
  };

  const subtotal = getSubTotal();
  const packagingTotal = getPackagingTotal();
  const deliveryCharge: number = 50;
  const discountedPrice = Math.floor((subtotal * discount) / 100);
  const total = subtotal + packagingTotal - discountedPrice + deliveryCharge;

  // Get packaging details for each item
  const packagingDetails = cartItems
    .filter(item => item.packagingStyle && item.packagingStylePrice > 0)
    .map(item => ({
      name: item.packagingStyle,
      price: item.packagingStylePrice,
      quantity: item.quantity,
      total: item.packagingStylePrice * item.quantity,
    }));

  return (
    <div className="lg:w-96 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
        <h2 className="text-lg font-semibold text-neutral-10 mb-4">
          Order Summary
        </h2>

        {/* Items with Packaging Details */}
        {cartItems.length > 0 && (
          <div className="space-y-3 max-h-[200px] overflow-y-auto mb-4 border-b border-neutral-50 pb-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-10">
                    {item.name} 
                    <span className="text-xs text-neutral-45 ml-1">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-neutral-10">
                    ₹{((item.discountedPrice || item.basePrice) * item.quantity).toFixed(0)}
                  </span>
                </div>
                {/* Show packaging for this item */}
                {item.packagingStyle && item.packagingStylePrice > 0 && (
                  <div className="flex justify-between text-xs text-neutral-45 pl-2 mt-0.5 border-l-2 border-primary-10">
                    <span>📦 {item.packagingStyle}</span>
                    <span>+₹{(item.packagingStylePrice * item.quantity).toFixed(0)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

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
              onClick={handleValidateCouponCode}
              className="px-4 py-2 bg-primary-10 text-white rounded-lg text-sm font-medium hover:bg-[#d4892a] transition-colors whitespace-nowrap"
              disabled={isValidating}
            >
              {isValidating ? "Validating..." : "Apply"}
            </button>
          </div>
          {couponError && (
            <p className="text-xs text-red-500 mt-1">{couponError}</p>
          )}
          {appliedCoupon && (
            <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-lg">
              <div>
                <span className="text-xs font-medium text-green-700">
                  "{appliedCoupon.code}" applied
                </span>
                <span className="text-xs text-green-600 ml-2">
                  {appliedCoupon.discountPercentage}% off
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
            <span className="text-neutral-45">
              Subtotal ({cartItems?.length} item{cartItems?.length > 1 && "s"})
            </span>
            <span className="text-neutral-10 font-medium">
              ₹{subtotal.toFixed(0)}
            </span>
          </div>

          {/* Packaging Charges */}
          {packagingTotal > 0 && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-45">Packaging Charges</span>
                <span className="text-neutral-10 font-medium">
                  ₹{packagingTotal.toFixed(0)}
                </span>
              </div>
              {/* Individual packaging breakdown */}
              {packagingDetails.length > 0 && (
                <div className="ml-4 space-y-1">
                  {packagingDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between text-xs text-neutral-45">
                      <span>• {detail.name} (×{detail.quantity})</span>
                      <span>+₹{detail.total.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
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

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Coupon Discount</span>
              <span className="text-green-600 font-medium">
                -₹{Math.floor(discountedPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 mb-4">
          <div>
            <span className="text-base font-semibold text-neutral-10">Total</span>
            {packagingTotal > 0 && (
              <p className="text-xs text-neutral-45">Incl. packaging charges</p>
            )}
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-neutral-10">
              ₹{total.toFixed(0)}
            </span>
            {packagingTotal > 0 && (
              <p className="text-xs text-neutral-45">
                Packaging: ₹{packagingTotal.toFixed(0)}
              </p>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="w-full py-3 bg-primary-10 text-white text-sm rounded-xl font-medium hover:bg-[#d4892a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          Proceed to Checkout
          <FiArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;