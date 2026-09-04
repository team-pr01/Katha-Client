import { useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiPackage,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { useCart } from "../../../providers/CartProvider/CartProvider";

const OrderSummary = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { cartItems, getSubTotal, getPackagingTotal } = useCart();

  const subtotal = getSubTotal();
  const packagingTotal = getPackagingTotal();
  const deliveryCharge: number = 50;
  const total = subtotal + packagingTotal + deliveryCharge;
  return (
    <div className="lg:w-96 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
        <h2 className="text-lg font-semibold text-neutral-10 mb-4 flex items-center gap-2">
          <FiPackage className="text-primary-10" />
          Order Summary
        </h2>

        {/* Calculations */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-45">
              Subtotal ({cartItems.length} items)
            </span>
            <span className="text-neutral-10 font-medium">₹{subtotal}</span>
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
