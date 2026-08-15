import { useState } from "react";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiMail,
  FiMapPin,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  saveInfo: boolean;
}

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const CheckoutForm = () => {
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    saveInfo: false,
  });
  const [selectedPayment, setSelectedPayment] = useState<string>("cod");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: <FiTruck className="text-primary-10" size={20} />,
    },
    {
      id: "upi",
      label: "UPI",
      icon: <FiCreditCard className="text-primary-10" size={20} />,
    },
  ];

  const handleInputChange = (field: keyof CheckoutForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
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

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FiUser className="text-primary-10" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                            ${errors.firstName ? "border-red-500" : "border-neutral-50"}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                            ${errors.lastName ? "border-red-500" : "border-neutral-50"}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FiMail className="text-primary-10" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                            ${errors.email ? "border-red-500" : "border-neutral-50"}`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                            ${errors.phone ? "border-red-500" : "border-neutral-50"}`}
                  placeholder="98765 43210"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FiMapPin className="text-primary-10" />
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                            ${errors.address ? "border-red-500" : "border-neutral-50"}`}
                  placeholder="Street address"
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.address}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-10 mb-1">
                  Apartment, Suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) =>
                    handleInputChange("apartment", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent"
                  placeholder="Apartment, suite, building (optional)"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                              ${errors.city ? "border-red-500" : "border-neutral-50"}`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                              ${errors.state ? "border-red-500" : "border-neutral-50"}`}
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.state}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-10 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all
                              ${errors.pincode ? "border-red-500" : "border-neutral-50"}`}
                    placeholder="110001"
                  />
                  {errors.pincode && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.pincode}
                    </p>
                  )}
                </div>
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

          {/* Save Info */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="saveInfo"
              checked={formData.saveInfo}
              onChange={(e) => handleInputChange("saveInfo", e.target.checked)}
              className="w-4 h-4 rounded border-neutral-50 text-primary-10 focus:ring-primary-10 focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor="saveInfo"
              className="text-sm text-neutral-10 cursor-pointer"
            >
              Save this information for future orders
            </label>
          </div>

          {/* Back to Cart */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-neutral-45 hover:text-primary-10 transition-colors"
          >
            <FiArrowLeft size={16} />
            Return to Cart
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
