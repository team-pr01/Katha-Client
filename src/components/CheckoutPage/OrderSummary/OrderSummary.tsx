import { useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiPackage,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const OrderSummary = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const cartItems = [
    {
      id: "1",
      name: "The Jewel Embedded Brass Elephant",
      image: "/api/placeholder/80/80",
      price: 200,
      quantity: 1,
      size: "Medium",
      color: "Brass",
    },
    {
      id: "2",
      name: "Handcrafted Brass Diya Set",
      image: "/api/placeholder/80/80",
      price: 899,
      quantity: 2,
      size: "Classic",
      color: "Brass",
    },
    {
      id: "3",
      name: "Brass Peacock Showpiece",
      image: "/api/placeholder/80/80",
      price: 3499,
      quantity: 1,
      size: "Large",
      color: "Brass",
    },
  ];
  const totalSavings = 0;

  // Calculate from actual data
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCharge = subtotal > 500 ? 0 : 49;
  const total = subtotal + deliveryCharge;
  return (
    <div className="lg:w-96 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
        <h2 className="text-lg font-semibold text-neutral-10 mb-4 flex items-center gap-2">
          <FiPackage className="text-primary-10" />
          Order Summary
        </h2>

        {/* Items */}
        <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 pb-3 border-b border-neutral-50 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-neutral-20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-10 line-clamp-1">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-45 mt-0.5">
                  {item.size && <span>Size: {item.size}</span>}
                  {item.color && <span>Color: {item.color}</span>}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-neutral-10">
                    ₹{item.price}
                  </span>
                  <span className="text-xs text-neutral-45">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div className="space-y-2 border-t border-neutral-50 pt-4 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-45">
              Subtotal ({cartItems.length} items)
            </span>
            <span className="text-neutral-10 font-medium">₹{subtotal}</span>
          </div>
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Total Savings</span>
              <span className="text-green-600 font-medium">
                -₹{totalSavings}
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
              Free Delivery*
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
            Orders are processed within 24 hours. Free delivery on orders above
            ₹500.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
