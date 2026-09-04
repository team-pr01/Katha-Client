import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiPackage,
  FiShield,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import toast from "react-hot-toast";
import type { CheckoutFormRef } from "../CheckoutForm/CheckoutForm";
import { useValidateCouponCodeMutation } from "../../../redux/Features/CouponCode/couponCodeApi";

interface OrderSummaryProps {
  formRef: React.RefObject<CheckoutFormRef | null>;
}

const OrderSummary = ({ formRef }: OrderSummaryProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { cartItems, getSubTotal, getPackagingTotal } = useCart();

  const [validateCouponCode, { isLoading: isValidating }] =
    useValidateCouponCodeMutation();
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    if (appliedCoupon && formRef?.current) {
      formRef.current.setCouponData(
        appliedCoupon.code,
      );
    }
  }, [appliedCoupon, formRef]);

  // Reset coupon data in form when removed
  useEffect(() => {
    if (!appliedCoupon && formRef?.current) {
      formRef.current.setCouponData("");
    }
  }, [appliedCoupon, formRef]);

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
  const total = subtotal + packagingTotal + deliveryCharge - discountedPrice;

  // Handle form submission from OrderSummary
  const handlePlaceOrder = async () => {
    if (!formRef?.current) {
      toast.error("Form not found. Please refresh the page.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Trigger validation
      const isValid = await formRef.current.triggerValidation();

      if (isValid) {
        // Submit the form
        formRef.current.submitForm();
      } else {
        // Scroll to first error
        const firstError = document.querySelector(".text-red-500");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        toast.error("Please fix the errors before placing order.");
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:w-96 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
        <h2 className="text-lg font-semibold text-neutral-10 mb-4 flex items-center gap-2">
          <FiPackage className="text-primary-10" />
          Order Summary
        </h2>

        {/* Items Count */}
        <div className="mb-4 pb-4 border-b border-neutral-50">
          <p className="text-sm text-neutral-45">
            {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your
            cart
          </p>
        </div>

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
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-45">Subtotal</span>
            <span className="text-neutral-10 font-medium">
              ₹{subtotal.toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-45">Packaging Charges</span>
            <span className="text-neutral-10 font-medium">
              ₹{packagingTotal.toFixed(0)}
            </span>
          </div>
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
        <div className="flex justify-between items-center pt-4 border-t border-neutral-50 mb-4">
          <span className="text-base font-semibold text-neutral-10">Total</span>
          <span className="text-2xl font-bold text-neutral-10">
            ₹{total.toFixed(0)}
          </span>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className={`
            w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
            ${
              isSubmitting
                ? "bg-neutral-50 text-neutral-45 cursor-not-allowed"
                : "bg-primary-10 text-white hover:bg-[#d4892a] shadow-md hover:shadow-lg"
            }
          `}
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FiCheck size={18} />
              Place Order
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
            <FiShield className="text-primary-10 text-lg" />
            <span className="text-xs text-neutral-45 mt-1 text-center">
              Secure Payment
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
            <FiTruck className="text-primary-10 text-lg" />
            <span className="text-xs text-neutral-45 mt-1 text-center">
              Safe Delivery*
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
            <FiPackage className="text-primary-10 text-lg" />
            <span className="text-xs text-neutral-45 mt-1 text-center">
              Easy Returns
            </span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-3 p-3 bg-neutral-20 rounded-lg">
          <p className="text-xs text-neutral-45 text-center">
            <FiAlertCircle className="inline mr-1 text-primary-10" size={12} />
            Orders are processed within 24 hours. Delivery may take up to 3
            days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
