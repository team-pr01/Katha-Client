import React, { useEffect, useState } from "react";
import { FiAlertCircle, FiMail, FiPhone } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import OrderTrackingData from "../OrderTrackingData/OrderTrackingData";
import Modal from "../../components/Reusable/Modal/Modal";
import Login from "../../components/AuthComponents/Login/Login";
import Signup from "../../components/AuthComponents/Signup/Signup";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useTrackOrderMutation } from "../../redux/Features/TrackOrder/trackOrderApi";

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
  const [searchParams] = useSearchParams();

  const orderIdParams = searchParams.get("orderId");
  const emailParam = searchParams.get("email");
  const phoneNumberParam = searchParams.get("phoneNumber");

  const [trackOrder, { isLoading }] = useTrackOrderMutation();

  const [orderId, setOrderId] = useState<string>("");
  const [verifyMethod, setVerifyMethod] = useState<"email" | "phone">("email");
  const [verifyValue, setVerifyValue] = useState<string>("");
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);
  const [error, setError] = useState<string>("");

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">(
    "login",
  );

  // Prefill from URL params
  useEffect(() => {
    if (orderIdParams) {
      setOrderId(orderIdParams);
    }
    if (emailParam) {
      setVerifyMethod("email");
      setVerifyValue(emailParam);
    } else if (phoneNumberParam) {
      setVerifyMethod("phone");
      setVerifyValue(phoneNumberParam);
    }
  }, [orderIdParams, emailParam, phoneNumberParam]);

  // Auto-trigger tracking if all params present
  useEffect(() => {
    if (orderIdParams && (emailParam || phoneNumberParam)) {
      handleTrackOrderFromUrl(orderIdParams, emailParam, phoneNumberParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrackOrderFromUrl = async (
    id: string,
    email: string | null,
    phoneNumber: string | null,
  ) => {
    setError("");
    setOrderData(null);

    const payload = {
      orderId: id.trim().toUpperCase().replace("#", ""),
      verifyWith: email ? "email" : "phoneNumber",
      email: email || "",
      phoneNumber: phoneNumber || "",
    };

    try {
      const response = await trackOrder(payload).unwrap();
      console.log(response);

      if (response?.success) {
        setOrderData(response?.data);
      } else {
        setError(
          response?.message ||
            "No order found with this information. Please check and try again.",
        );
      }
    } catch (err: any) {
      console.error("Track order error:", err);
      const errorMessage =
        "No order found with this information. Please check and try again.";
      setError(errorMessage);
    }
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

    // Build payload
    const payload = {
      orderId: orderId.trim().toUpperCase().replace("#", ""),
      verifyWith: verifyMethod === "email" ? "email" : "phoneNumber",
      email: verifyMethod === "email" ? verifyValue.trim() : "",
      phoneNumber: verifyMethod === "phone" ? verifyValue.trim() : "",
    };

    try {
      const response = await trackOrder(payload).unwrap();

      if (response?.success) {
        setOrderData(response?.data);
        toast.success("Order found!");
      } else {
        setError(
          response?.message ||
            "No order found with this information. Please check and try again.",
        );
      }
    } catch (err: any) {
      console.error("Track order error:", err);
      const errorMessage =
        "No order found with this information. Please check and try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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
                    }}
                    placeholder="e.g. K-040926-00001"
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
