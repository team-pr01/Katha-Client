import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiMail,
  FiMapPin,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../Reusable/TextInput/TextInput";
import {
  useCheckoutMutation,
  useGetRazorpayKeyQuery,
  useVerifyPaymentMutation,
} from "../../../redux/Features/Order/orderApi";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../redux/Features/Auth/authSlice";

// ─── Types ────────────────────────────────────────────────
type TCheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
};

type TPaymentMethod = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type CheckoutFormRef = {
  submitForm: () => void;
  triggerValidation: () => Promise<boolean>;
  setCouponData: (code: string) => void;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutFormProps {
  setLoading: (loading: boolean) => void;
}

const CheckoutForm = forwardRef<CheckoutFormRef, CheckoutFormProps>(
  ({ setLoading }, ref) => {
    const user = useSelector(useCurrentUser) as TLoggedInUser;
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const [checkout] = useCheckoutMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const [selectedPayment, setSelectedPayment] = useState<string>("COD");
    const [couponCode, setCouponCode] = useState<string>("");

    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState<boolean>(false);

    const {
      register,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm<TCheckoutFormData>({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        pinCode: "",
      },
    });

    const { data: razorpayKeyData } = useGetRazorpayKeyQuery({});
    const razorpayKey = razorpayKeyData?.key;

    // ─── Expose methods to parent via ref ────────────────
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        // Submit → validate + route based on payment method
        handleSubmit((data) => {
          if (selectedPayment === "UPI") {
            handlePlaceOrder(data); // Razorpay flow
          } else {
            onSubmit(data); // COD flow
          }
        })();
      },
      triggerValidation: async () => {
        const result = await trigger();
        return result;
      },
      setCouponData: (code: string) => {
        setCouponCode(code);
      },
    }));

    const paymentMethods: TPaymentMethod[] = [
      {
        id: "COD",
        label: "Cash on Delivery",
        icon: <FiTruck className="text-primary-10" size={20} />,
      },
      {
        id: "UPI",
        label: "Pay Online",
        icon: <FiCreditCard className="text-primary-10" size={20} />,
      },
    ];

    // ─── Razorpay loader ──────────────────────────────────
    useEffect(() => {
      const checkRazorpay = () => {
        if (window.Razorpay) {
          setIsRazorpayLoaded(true);
        } else {
          setTimeout(checkRazorpay, 1000);
        }
      };

      if (window.Razorpay) {
        setIsRazorpayLoaded(true);
      } else {
        checkRazorpay();
      }

      const handleRazorpayLoad = () => setIsRazorpayLoaded(true);
      window.addEventListener("razorpay-loaded", handleRazorpayLoad);

      return () => {
        window.removeEventListener("razorpay-loaded", handleRazorpayLoad);
      };
    }, []);

    // ─── COD Order (direct) ──────────────────────────────
    const onSubmit = async (data: TCheckoutFormData) => {
      setLoading(true);
      try {
        const orderedItems = cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || "",
          quantity: item.quantity,
          packagingName: item.packagingStyle || "",
          packagingPrice: item.packagingStylePrice || 0,
        }));

        const payload = {
          couponCode: couponCode,
          orderedItems,
          paymentMethod: "COD",
          shippingAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email || "",
            phoneNumber: data.phoneNumber,
            addressLine1: data.address,
            addressLine2: data.apartment || "",
            city: data.city,
            state: data.state,
            pinCode: data.pinCode,
          },
        };

        const response = await checkout(payload).unwrap();

        if (response?.success) {
          toast.success("Order placed successfully!");
          clearCart();
          navigate(`/order-success/${response?.data?.orderId}`);
        }
      } catch (err: any) {
        console.error("Checkout error:", err);
        toast.error(
          err?.data?.message || "Failed to place order. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    // ─── Razorpay Order (UPI) ────────────────────────────
    const handlePlaceOrder = async (data: TCheckoutFormData) => {
      if (!isRazorpayLoaded) {
        toast.error("Payment system not ready. Please try again.");
        return;
      }

      if (!user) {
        toast.error("Please login to proceed");
        return;
      }

      if (cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      setLoading(true);

      try {
        const orderedItems = cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || "",
          quantity: item.quantity,
          packagingName: item.packagingStyle || "",
          packagingPrice: item.packagingStylePrice || 0,
        }));

        const payload = {
          couponCode: couponCode,
          orderedItems,
          paymentMethod: "UPI",
          shippingAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email || "",
            phoneNumber: data.phoneNumber,
            addressLine1: data.address,
            addressLine2: data.apartment || "",
            city: data.city,
            state: data.state,
            pinCode: data.pinCode,
          },
        };

        // Create order + razorpay order in backend
        const orderResponse = await checkout(payload).unwrap();

        if (!orderResponse?.success) {
          throw new Error("Failed to create order");
        }

        const { orderId, razorpayOrderId, totalAmount } = orderResponse.data;

        const options = {
          key: razorpayKey,
          amount: Math.round(totalAmount * 100),
          currency: "INR",
          name: "Katha",
          description: `Order #${orderId}`,
          order_id: razorpayOrderId,
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email || "",
            contact: data.phoneNumber || "",
          },
          theme: { color: "#eb9e3a" },
          modal: {
            ondismiss: function () {
              setLoading(false);
              toast.error("Payment cancelled");
            },
          },
          handler: function (response: any) {
            const paymentId = response.razorpay_payment_id;
            // const razorpayOrderId =
            //   response.razorpay_order_id || razorpayOrder?.id;
            // const signature = response.razorpay_signature || "";

            handleVerifyPayment(
              // razorpayOrderId,
              paymentId,
              // signature,
              orderId,
            );
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } catch (error: any) {
        console.error("❌ Order creation error:", error);
        toast.error(
          error?.data?.message || error?.message || "Failed to place order",
        );
        setLoading(false);
      }
    };

    // ─── Verify Razorpay payment ─────────────────────────
    const handleVerifyPayment = async (
      // razorpayOrderId: string,
      razorpayPaymentId: string,
      // razorpaySignature: string,
      orderId: string,
    ) => {
      try {
        const payload = {
          razorpayPaymentId,
        };
        const response = await verifyPayment({
          id: orderId,
          data: payload,
        }).unwrap();

        if (response.success) {
          clearCart();
          navigate(`/order-success/${orderId}`);
        }
      } catch (error: any) {
        console.error("❌ Payment verification error:", error);
        toast.error("Payment verification failed");
        navigate("/payment-failed");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-neutral-10">Checkout</h1>
            <span className="text-sm bg-primary-10/10 text-primary-10 px-3 py-1 rounded-full">
              Secure Checkout
            </span>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiUser className="text-primary-10" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="First Name"
                  placeholder="Enter first name"
                  error={errors.firstName}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Enter last name"
                  error={errors.lastName}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiMail className="text-primary-10" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                  error={errors.email}
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                <TextInput
                  label="Phone Number"
                  placeholder="98765 43210"
                  type="tel"
                  error={errors.phoneNumber}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiMapPin className="text-primary-10" />
                Shipping Address
              </h2>
              <div className="space-y-4">
                <TextInput
                  label="Address"
                  placeholder="Street address"
                  error={errors.address}
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                <TextInput
                  label="Apartment, Suite, etc. (Optional)"
                  placeholder="Apartment, suite, building (optional)"
                  error={errors.apartment}
                  {...register("apartment")}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <TextInput
                    label="City"
                    placeholder="City"
                    error={errors.city}
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                  <TextInput
                    label="State"
                    placeholder="State"
                    error={errors.state}
                    {...register("state", {
                      required: "State is required",
                    })}
                  />
                  <TextInput
                    label="Pin Code"
                    placeholder="110001"
                    type="text"
                    error={errors.pinCode}
                    {...register("pinCode", {
                      required: "Pin code is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit pin code",
                      },
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiCreditCard className="text-primary-10" />
                Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`
                    flex items-center gap-3 p-3 border-2 rounded-xl transition-all
                    ${
                      selectedPayment === method.id
                        ? "border-primary-10 bg-primary-10/5 shadow-md"
                        : "border-neutral-50 hover:border-primary-10"
                    }
                  `}
                  >
                    {method.icon}
                    <span className="text-sm font-medium text-neutral-10">
                      {method.label}
                    </span>
                    {selectedPayment === method.id && (
                      <FiCheck className="ml-auto text-primary-10" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Back to Cart */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-sm text-neutral-45 hover:text-primary-10 transition-colors"
              >
                <FiArrowLeft size={16} />
                Return to Cart
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  },
);

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
