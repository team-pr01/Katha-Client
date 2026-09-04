import { useState } from "react";
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
import Button from "../../Reusable/Button/Button";
import { useCheckoutMutation } from "../../../redux/Features/Order/orderApi";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import toast from "react-hot-toast";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
}

interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [checkout, { isLoading }] = useCheckoutMutation();
  const [selectedPayment, setSelectedPayment] = useState<string>("COD");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
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

  const paymentMethods: PaymentMethod[] = [
    {
      id: "COD",
      label: "Cash on Delivery",
      icon: <FiTruck className="text-primary-10" size={20} />,
    },
    {
      id: "UPI",
      label: "UPI",
      icon: <FiCreditCard className="text-primary-10" size={20} />,
    },
  ];

  const handleCheckout = async (data: CheckoutFormData) => {
    try {
      // Map cart items to orderedItems array
      const orderedItems = cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId || "",
        quantity: item.quantity,
        price: item.discountedPrice || item.basePrice,
        packagingName: item.packagingStyle || "",
        packagingPrice: item.packagingStylePrice || 0,
      }));

      const payload = {
        orderedItems,
        paymentMethod: selectedPayment,
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
        navigate(`/order-success/${response?.data?.orderId}`, {
          state: { totalAmount: response?.data?.totalAmount },
        });
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(
        err?.data?.message || "Failed to place order. Please try again.",
      );
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

        <form onSubmit={handleSubmit(handleCheckout)}>
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
                  label="pinCode"
                  placeholder="110001"
                  type="text"
                  error={errors.pinCode}
                  {...register("pinCode", {
                    required: "pinCode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Please enter a valid 6-digit pinCode",
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

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-sm text-neutral-45 hover:text-primary-10 transition-colors"
            >
              <FiArrowLeft size={16} />
              Return to Cart
            </Link>
            <Button
              type="submit"
              label={isLoading ? "Processing..." : "Place Order"}
              variant="primary"
              className="w-full sm:w-auto px-8 py-3"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
