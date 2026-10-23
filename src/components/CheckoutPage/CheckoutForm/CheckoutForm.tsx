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
  FiPackage,
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
import { useCalculateRatesMutation } from "../../../redux/Features/Shipping/shippingApi";

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

type TShippingOption = {
  courier_name: string;
  rate: number;
  estimated_delivery_days: string;
  courier_id?: string;
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
  setShippingCharge: (charge: number) => void;
}

const CheckoutForm = forwardRef<CheckoutFormRef, CheckoutFormProps>(
  ({ setLoading, setShippingCharge }, ref) => {
    const user = useSelector(useCurrentUser) as TLoggedInUser;
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const [checkout] = useCheckoutMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const [selectedPayment, setSelectedPayment] = useState<string>("COD");
    const [couponCode, setCouponCode] = useState<string>("");
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState<boolean>(false);

    const [shippingOptions, setShippingOptions] = useState<TShippingOption[]>(
      [],
    );
    const [selectedShipping, setSelectedShipping] =
      useState<TShippingOption | null>(null);
    const [pinCode, setPinCode] = useState<string>("");

    const {
      register,
      handleSubmit,
      trigger,
      watch,
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

    // Watch the pinCode field
    const watchedPinCode = watch("pinCode");

    // Update state when pincode changes
    useEffect(() => {
      setPinCode(watchedPinCode || "");
    }, [watchedPinCode]);

    const [calculateRates, { isLoading: isCalculatingRates }] =
      useCalculateRatesMutation();

    // Calculate total weight (mock: 500g per item for now)
    const totalWeightInGrams = cartItems.reduce(
      (sum, item) => sum + item.quantity * 500,
      0,
    );
    const cartTotal = cartItems.reduce(
      (sum, item) =>
        sum + (item.discountedPrice || item.basePrice) * item.quantity,
      0,
    );

    // Trigger rate calculation when pincode is valid
    // Trigger rate calculation when pincode is valid
    useEffect(() => {
      if (pinCode?.length === 6) {
        calculateRates({
          origin: "431001", // Your warehouse pincode
          deliveryPincode: pinCode, // Frontend sends 'destination', which your backend maps
          payment_method: selectedPayment === "COD" ? "cod" : "prepaid",
          order_amount: cartTotal,
          weight: totalWeightInGrams > 0 ? totalWeightInGrams : 500,
          length: 10,
          breadth: 10, // Frontend sends 'breadth'
          height: 10,
        })
          .unwrap()
          .then((res: any) => {
            // ✅ Map the Nimbus V2 structure to your TShippingOption structure
            const availableCouriers = res?.data?.data?.available || [];

            const mappedOptions: TShippingOption[] = availableCouriers.map(
              (courier: any) => ({
                courier_name: courier.courierName,
                courier_id: courier.courierId,
                // Nimbus sends total in Paise, convert to Rupees
                rate: courier.result.totalPaise / 100,
                // Nimbus sends Tat (Turnaround Time) in days
                estimated_delivery_days: `${courier.tatDays}`,
              }),
            );

            setShippingOptions(mappedOptions);

            // Auto-select the cheapest option
            if (mappedOptions.length > 0) {
              const cheapest = mappedOptions.reduce((prev, curr) =>
                prev.rate < curr.rate ? prev : curr,
              );
              setSelectedShipping(cheapest);
              setShippingCharge(cheapest.rate);
            }
          })
          .catch((err) => {
            console.error("Rate calculation failed:", err);
            setShippingOptions([]);
            setSelectedShipping(null);
            setShippingCharge(0);
          });
      } else {
        setShippingOptions([]);
        setSelectedShipping(null);
        setShippingCharge(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pinCode, selectedPayment, cartTotal, totalWeightInGrams]);

    const { data: razorpayKeyData } = useGetRazorpayKeyQuery({});
    const razorpayKey = razorpayKeyData?.key;

    // ─── Expose methods to parent via ref ────────────────
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        handleSubmit((data) => {
          if (selectedPayment === "UPI") {
            handlePlaceOrder(data);
          } else {
            onSubmit(data);
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
      if (!selectedShipping) {
        toast.error(
          "Please wait for delivery charges to calculate or check your pincode.",
        );
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
          paymentMethod: "COD",
          shippingCharge: selectedShipping.rate,
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

      if (!selectedShipping) {
        toast.error("Please wait for delivery charges to calculate.");
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
          shippingCharge: selectedShipping.rate,
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
            handleVerifyPayment(paymentId, orderId);
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
      razorpayPaymentId: string,
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

            {/* Delivery / Shipping Options */}
            {pinCode?.length === 6 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FiPackage className="text-primary-10" />
                  Delivery Options
                </h2>

                {isCalculatingRates ? (
                  <div className="flex items-center gap-3 p-4 bg-neutral-20/50 rounded-xl">
                    <span className="w-4 h-4 border-2 border-primary-10 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-neutral-45">
                      Calculating delivery charges...
                    </p>
                  </div>
                ) : shippingOptions.length > 0 ? (
                  <div className="space-y-2">
                    {shippingOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedShipping(option);
                          setShippingCharge(option.rate);
                        }}
                        className={`
                          w-full flex items-center justify-between p-3 border-2 rounded-xl transition-all
                          ${
                            selectedShipping?.courier_name ===
                            option.courier_name
                              ? "border-primary-10 bg-primary-10/5 shadow-md"
                              : "border-neutral-50 hover:border-primary-10"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <FiTruck className="text-neutral-45" size={18} />
                          <div className="text-left">
                            <p className="text-sm font-medium text-neutral-10">
                              {option.courier_name}
                            </p>
                            <p className="text-xs text-neutral-45">
                              Est. delivery: {option.estimated_delivery_days}{" "}
                              days
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-neutral-10">
                            ₹{option.rate}
                          </span>
                          {selectedShipping?.courier_name ===
                            option.courier_name && (
                            <FiCheck className="text-primary-10" size={18} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600">
                      Delivery is not available for this PIN code. Please try a
                      different address.
                    </p>
                  </div>
                )}
              </div>
            )}

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
