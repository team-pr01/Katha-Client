import React, { useState } from "react";
import { FiAlertCircle, FiMail, FiPhone } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import OrderTrackingData from "../OrderTrackingData/OrderTrackingData";
import Modal from "../../components/Reusable/Modal copy/Modal";
import Login from "../../components/AuthComponents/Login/Login";
import Signup from "../../components/AuthComponents/Signup/Signup";

// Types
interface TrackingStep {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  status: "completed" | "current" | "pending";
}

interface OrderTrackingData {
  orderId: string;
  status:
    | "Processing"
    | "Shipped"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  orderDate: string;
  expectedDelivery: string;
  deliveredDate?: string;
  trackingId: string;
  courier: string;
  paymentMethod: string;
  total: number;
  items: number;
  shippingAddress: string;
  currentLocation: string;
  steps: TrackingStep[];
}

const TrackOrder = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [verifyMethod, setVerifyMethod] = useState<"email" | "phone">("email");
  const [verifyValue, setVerifyValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">(
    "login",
  );

  // Mock tracking data
  const mockOrderData: OrderTrackingData = {
    orderId: "ORD-2024-001",
    status: "Shipped",
    orderDate: "12 Sep 2026",
    expectedDelivery: "18 Sep 2026",
    trackingId: "TRK123456789",
    courier: "BlueDart Express",
    paymentMethod: "Cash on Delivery",
    total: 1359,
    items: 2,
    shippingAddress: "123 Main Street, Mumbai, Maharashtra 400001",
    currentLocation: "Mumbai Sorting Center",
    steps: [
      {
        id: 1,
        title: "Order Placed",
        description: "Your order has been placed successfully",
        date: "12 Sep 2026",
        time: "10:30 AM",
        status: "completed",
      },
      {
        id: 2,
        title: "Order Confirmed",
        description: "Seller has confirmed your order",
        date: "12 Sep 2026",
        time: "02:15 PM",
        status: "completed",
      },
      {
        id: 3,
        title: "Packed & Ready",
        description: "Your order has been packed and ready for shipment",
        date: "14 Sep 2026",
        time: "09:00 AM",
        status: "completed",
      },
      {
        id: 4,
        title: "Shipped",
        description: "Order has been shipped from the warehouse",
        date: "15 Sep 2026",
        time: "11:45 AM",
        status: "current",
      },
      {
        id: 5,
        title: "Out for Delivery",
        description: "Order is out for delivery",
        date: "Expected 18 Sep",
        time: "09:00 AM",
        status: "pending",
      },
      {
        id: 6,
        title: "Delivered",
        description: "Order will be delivered to your address",
        date: "Expected 18 Sep",
        time: "Before 6:00 PM",
        status: "pending",
      },
    ],
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrderData(null);

    if (!orderId.trim()) {
      setError("Please enter an order number");
      return;
    }

    if (!verifyValue.trim()) {
      setError(
        verifyMethod === "email"
          ? "Please enter your email address"
          : "Please enter your phone number",
      );
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const normalizedInput = orderId.trim().toUpperCase().replace("#", "");
      const normalizedMockId = mockOrderData.orderId.toUpperCase();

      if (normalizedInput === normalizedMockId) {
        setOrderData(mockOrderData);
      } else {
        setError(
          "No order found with this information. Please check and try again.",
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-neutral-20 min-h-screen py-14 font-Manrope">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header - Minimal Style */}
          {!orderData && (
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-45 font-semibold mb-3">
                Order Tracking
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-10 mb-3">
                Find your order
              </h1>
              <p className="text-sm text-neutral-45 leading-relaxed">
                Enter your order number and the email or phone number used at
                checkout to view your order status and request a return.
              </p>
            </div>
          )}

          {!orderData && (
            <>
              {/* Search Form */}
              <form onSubmit={handleTrackOrder} className="space-y-5">
                {/* Order Number */}
                <div>
                  <label className="block text-xs tracking-wider uppercase text-neutral-45 font-semibold mb-2">
                    Order Number
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value.toUpperCase());
                      setError("");
                      setHasSearched(false);
                    }}
                    placeholder="e.g. 1056 or #1056"
                    className={`
                  w-full px-4 py-3 border rounded-lg text-sm bg-white
                  focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent
                  transition-all
                  ${error && !orderId ? "border-red-300" : "border-neutral-50"}
                `}
                  />
                </div>

                {/* Verify With */}
                <div>
                  <label className="block text-xs tracking-wider uppercase text-neutral-45 font-semibold mb-2">
                    Verify With
                  </label>
                  <div className="flex items-center gap-6 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="verifyMethod"
                        value="email"
                        checked={verifyMethod === "email"}
                        onChange={() => {
                          setVerifyMethod("email");
                          setVerifyValue("");
                          setError("");
                        }}
                        className="w-4 h-4 text-primary-10 focus:ring-primary-10 cursor-pointer"
                      />
                      <span className="text-sm text-neutral-10">
                        Email address
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="verifyMethod"
                        value="phone"
                        checked={verifyMethod === "phone"}
                        onChange={() => {
                          setVerifyMethod("phone");
                          setVerifyValue("");
                          setError("");
                        }}
                        className="w-4 h-4 text-primary-10 focus:ring-primary-10 cursor-pointer"
                      />
                      <span className="text-sm text-neutral-10">
                        Phone number
                      </span>
                    </label>
                  </div>

                  {/* Verify Input */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-45">
                      {verifyMethod === "email" ? (
                        <FiMail size={16} />
                      ) : (
                        <FiPhone size={16} />
                      )}
                    </span>
                    <input
                      type={verifyMethod === "email" ? "email" : "tel"}
                      value={verifyValue}
                      onChange={(e) => {
                        setVerifyValue(e.target.value);
                        setError("");
                        setHasSearched(false);
                      }}
                      placeholder={
                        verifyMethod === "email"
                          ? "you@example.com"
                          : "+91 98765 43210"
                      }
                      className={`
                    w-full pl-11 pr-4 py-3 border rounded-lg text-sm bg-white
                    focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent
                    transition-all
                    ${
                      error && orderId && !verifyValue
                        ? "border-red-300"
                        : "border-neutral-50"
                    }
                  `}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                w-full py-3.5 bg-primary-10 text-white rounded-lg 
                text-sm font-semibold transition-all
                hover:bg-neutral-10
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              `}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Find my order"
                  )}
                </button>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <FiAlertCircle
                      className="text-red-500 shrink-0"
                      size={16}
                    />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </form>

              {/* Sign In Note */}
              <p className="text-center text-sm text-neutral-45 mt-6">
                Have an account?{" "}
                <button
                  onClick={() => {
                    setAuthModalType("login");
                    setIsAuthModalOpen(true);
                  }}
                  className="text-neutral-10 font-semibold underline hover:text-primary-10 transition-colors"
                >
                  Sign in
                </button>{" "}
                to view all your orders.
              </p>
            </>
          )}

          {/* Order Tracking Details */}
          {orderData && (
            <OrderTrackingData
              orderData={orderData}
              setOrderData={setOrderData}
            />
          )}
        </div>
      </div>

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/919876500000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-[#1da851] hover:scale-110 transition-all duration-300"
      >
        <BsWhatsapp size={26} />
      </a>

      <Modal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen}>
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
          {authModalType === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-sm text-center mt-1 mb-8">
          {authModalType === "login"
            ? "Enter your details to login"
            : "Enter your details to create an account"}
        </p>

        {authModalType === "login" && (
          <Login setAuthModalType={setAuthModalType} />
        )}
        {authModalType === "signup" && (
          <Signup setAuthModalType={setAuthModalType} />
        )}
      </Modal>
    </>
  );
};

export default TrackOrder;
