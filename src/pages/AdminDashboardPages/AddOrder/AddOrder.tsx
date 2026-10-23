/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiCheck,
  FiUser,
  FiMail,
  FiMapPin,
  FiCreditCard,
  FiArrowLeft,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import toast from "react-hot-toast";

import AdminPageHeader from "../../../components/Reusable/AdminReusable/AdminPageHeader/AdminPageHeader";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";
import PackagingStyle from "../../../components/ProductDetailsPage/PackagingStyle/PackagingStyle";
import { IMAGES } from "../../../assets";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import type { TProduct, TProductVariant } from "../../../types/product.type";
import { useCheckoutMutation } from "../../../redux/Features/Order/orderApi";

// ─── Types ────────────────────────────────────────────────
type TShippingForm = {
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

export type TPackagingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
};

const packagingOptions: TPackagingOption[] = [
  {
    id: "regular",
    name: "Regular Packaging",
    description: "Basic packaging for safe delivery",
    price: 0,
    image: IMAGES.regularPackaging || "/api/placeholder/400/200",
  },
  {
    id: "ribbon",
    name: "Ribbon",
    description: "Elegant ribbon wrapping, perfect for gifting.",
    price: 160,
    image: IMAGES.ribbonPackaging || "/api/placeholder/400/200",
    isPopular: true,
  },
  {
    id: "flowers",
    name: "Decorative Flowers",
    description: "Beautiful floral accents for a festive presentation.",
    price: 160,
    image: IMAGES.decorativeFlowersPackaging || "/api/placeholder/400/200",
  },
  {
    id: "platter",
    name: "1 Ring Platter",
    description: "Premium brass platter presentation for a traditional gifting experience.",
    price: 160,
    image: IMAGES.ringPlatterPackaging || "/api/placeholder/400/200",
  },
];

const AddOrder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Step 1 State
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<TProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Step 2 State
  const [selectedPackage, setSelectedPackage] = useState<TPackagingOption>(packagingOptions[0]);

  // API Mutations
  const { data: productsData, isLoading: isSearching } = useGetAllProductsQuery(
    { keyword: searchQuery, limit: 5 },
    { skip: !searchQuery }
  );
  const [checkout, { isLoading: isCreating }] = useCheckoutMutation();

  // RHF for Shipping
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TShippingForm>();

  const [shippingData, setShippingData] = useState<TShippingForm | null>(null);

  // Handlers
  const handleProductSelect = (product: TProduct) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants?.[0] || null);
  };

  const handleShippingSubmit = (data: TShippingForm) => {
    setShippingData(data);
    setStep(4);
  };

  const handlePlaceOrder = async () => {
    if (!selectedProduct || !selectedVariant || !shippingData) {
      toast.error("Missing required information.");
      return;
    }

    try {
      const payload = {
        addedBy: "admin",
        paymentMethod: "COD",
        orderedItems: [
          {
            productId: selectedProduct._id,
            variantId: selectedVariant._id,
            quantity: quantity,
            packagingName: selectedPackage.name,
            packagingPrice: selectedPackage.price,
          },
        ],
        shippingAddress: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email || "",
          phoneNumber: shippingData.phoneNumber,
          addressLine1: shippingData.address,
          addressLine2: shippingData.apartment || "",
          city: shippingData.city,
          state: shippingData.state,
          pinCode: shippingData.pinCode,
        },
      };

      const response = await checkout(payload).unwrap();
      
      if (response?.success) {
        toast.success("Order created successfully!");
        navigate("/admin/dashboard/orders-management");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create order");
    }
  };

  // Step Validation
  const canProceedStep1 = selectedProduct && selectedVariant && quantity > 0;

  return (
    <div className="space-y-6 font-Manrope pb-10 max-w-5xl mx-auto">
      <AdminPageHeader
        eyebrow="Commerce"
        title="Create Manual Order"
        description="Add an order manually on behalf of a customer (Phone/Offline)."
        actions={
          <button
            onClick={() => navigate("/admin/dashboard/orders-management")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-20 bg-white text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-all"
          >
            <FiArrowLeft size={16} />
            Back to Orders
          </button>
        }
      />

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-neutral-20 p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-primary-10 text-white shadow-md" : "bg-neutral-20 text-neutral-45"
                }`}>
                  {step > s ? <FiCheck size={16} /> : s}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                  step >= s ? "text-primary-10" : "text-neutral-45"
                }`}>
                  {s === 1 && "Product"}
                  {s === 2 && "Packaging"}
                  {s === 3 && "Shipping"}
                  {s === 4 && "Review"}
                </span>
              </div>
              {s < 4 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all ${
                  step > s ? "bg-primary-10" : "bg-neutral-20"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ STEP 1: PRODUCT ═══════════════ */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-neutral-20 p-6 shadow-sm animate-fadeIn">
          <h2 className="text-lg font-bold text-neutral-10 mb-4 flex items-center gap-2">
            <FiShoppingBag className="text-primary-10" /> Select Product
          </h2>
          
          <div className="relative mb-6">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-45" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-20/60 border border-transparent text-sm focus:outline-none focus:bg-white focus:border-primary-10/40 transition-all"
            />
          </div>

          {/* Search Results */}
          {searchQuery && !selectedProduct && (
            <div className="space-y-2 mb-6">
              {isSearching ? (
                <p className="text-sm text-neutral-45">Searching...</p>
              ) : productsData?.data?.data?.length === 0 ? (
                <p className="text-sm text-neutral-45">No products found.</p>
              ) : (
                productsData?.data?.data?.map((p: TProduct) => (
                  <button
                    key={p._id}
                    onClick={() => handleProductSelect(p)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl border border-neutral-20 hover:border-primary-10 bg-white transition-all text-left"
                  >
                    <img src={p.variants?.[0]?.images?.[0]} alt={p.name} className="size-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-10">{p.name}</p>
                      <p className="text-xs text-neutral-45">{p.category} · {p.variants?.length} variants</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Selected Product Details */}
          {selectedProduct && (
            <div className="bg-neutral-20/40 border border-neutral-20 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedProduct.variants?.[0]?.images?.[0]} alt="" className="size-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-neutral-10">{selectedProduct.name}</h3>
                    <p className="text-xs text-neutral-45">{selectedProduct.category}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-xs text-red-500 hover:underline">Change</button>
              </div>

              <div className="pt-4 border-t border-neutral-20">
                <p className="text-xs font-semibold text-neutral-10 mb-2">Select Variant</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants?.map((v) => (
                    <button
                      key={v._id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedVariant?._id === v._id 
                          ? "bg-primary-10 text-white border-primary-10" 
                          : "bg-white text-neutral-10 border-neutral-20 hover:border-primary-10"
                      }`}
                    >
                      {v.size} / {v.color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-20 flex items-center gap-4">
                <div>
                  <p className="text-xs font-semibold text-neutral-10 mb-2">Quantity</p>
                  <div className="flex items-center border border-neutral-20 rounded-lg bg-white overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-20 text-neutral-45">-</button>
                    <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-20 text-neutral-45">+</button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-10 mb-2">Unit Price</p>
                  <p className="text-sm font-bold text-primary-10">₹{selectedVariant?.discountedPrice || selectedVariant?.basePrice}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              label="Next: Packaging"
              variant="primary"
              icon={true}
              isDisabled={!canProceedStep1}
              onClick={() => setStep(2)}
            />
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 2: PACKAGING ═══════════════ */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-neutral-20 p-6 shadow-sm animate-fadeIn">
          <h2 className="text-lg font-bold text-neutral-10 mb-4 flex items-center gap-2">
            <FiPackage className="text-primary-10" /> Select Packaging
          </h2>

          <PackagingStyle
            packagingOptions={packagingOptions}
            selectedPackage={selectedPackage}
            setSelectedPackage={
              setSelectedPackage as React.Dispatch<React.SetStateAction<TPackagingOption | null>>
            }
          />

          <div className="mt-6 flex justify-between">
            <Button label="Back" variant="outlinePrimary" onClick={() => setStep(1)} icon={false} />
            <Button label="Next: Shipping" variant="primary" icon={true} onClick={() => setStep(3)} />
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 3: SHIPPING ═══════════════ */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-neutral-20 p-6 shadow-sm animate-fadeIn">
          <h2 className="text-lg font-bold text-neutral-10 mb-4 flex items-center gap-2">
            <FiMapPin className="text-primary-10" /> Shipping Information
          </h2>

          <form id="shipping-form" onSubmit={handleSubmit(handleShippingSubmit)}>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-10 uppercase mb-3 flex items-center gap-2"><FiUser size={14} /> Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="First Name" placeholder="John" error={errors.firstName} {...register("firstName", { required: "Required" })} />
                <TextInput label="Last Name" placeholder="Doe" error={errors.lastName} {...register("lastName", { required: "Required" })} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-10 uppercase mb-3 flex items-center gap-2"><FiMail size={14} /> Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Email" placeholder="john@example.com" type="email" error={errors.email} {...register("email")} />
                <TextInput label="Phone" placeholder="9876543210" type="tel" error={errors.phoneNumber} {...register("phoneNumber", { required: "Required" })} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-10 uppercase mb-3 flex items-center gap-2"><FiMapPin size={14} /> Address</h3>
              <div className="space-y-4">
                <TextInput label="Address" placeholder="Street Address" error={errors.address} {...register("address", { required: "Required" })} />
                <TextInput label="Apartment (Optional)" placeholder="Apt 4B" error={errors.apartment} {...register("apartment")} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <TextInput label="City" placeholder="City" error={errors.city} {...register("city", { required: "Required" })} />
                  <TextInput label="State" placeholder="State" error={errors.state} {...register("state", { required: "Required" })} />
                  <TextInput label="Pin Code" placeholder="110001" error={errors.pinCode} {...register("pinCode", { required: "Required" })} />
                </div>
              </div>
            </div>
          </form>

          <div className="mt-6 flex justify-between">
            <Button label="Back" variant="outlinePrimary" onClick={() => setStep(2)} icon={false} />
            <Button type="submit" label="Next: Review" variant="primary" icon={true} onClick={handleSubmit(handleShippingSubmit)} />
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 4: REVIEW & PLACE ═══════════════ */}
      {step === 4 && selectedProduct && selectedVariant && shippingData && (
        <div className="bg-white rounded-2xl border border-neutral-20 p-6 shadow-sm animate-fadeIn">
          <h2 className="text-lg font-bold text-neutral-10 mb-6 flex items-center gap-2">
            <FiCreditCard className="text-primary-10" /> Review Order
          </h2>

          <div className="space-y-6">
            {/* Product Summary */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-20/40 border border-neutral-20">
              <img src={selectedVariant.images?.[0]} alt="" className="size-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-neutral-10">{selectedProduct.name}</p>
                <p className="text-xs text-neutral-45">Size: {selectedVariant.size} | Color: {selectedVariant.color} | Qty: {quantity}</p>
                <p className="text-xs text-primary-10 mt-1">Packaging: {selectedPackage.name} (+₹{selectedPackage.price})</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-neutral-10">
                  ₹{((selectedVariant.discountedPrice || selectedVariant.basePrice) * quantity) + (selectedPackage.price * quantity)}
                </p>
              </div>
            </div>

            {/* Shipping Summary */}
            <div className="p-4 rounded-xl bg-neutral-20/40 border border-neutral-20">
              <h4 className="text-sm font-semibold text-neutral-10 mb-2">Shipping To</h4>
              <p className="text-sm text-neutral-10">{shippingData.firstName} {shippingData.lastName}</p>
              <p className="text-xs text-neutral-45">{shippingData.address}, {shippingData.apartment}</p>
              <p className="text-xs text-neutral-45">{shippingData.city}, {shippingData.state} - {shippingData.pinCode}</p>
              <p className="text-xs text-neutral-45 mt-1">{shippingData.phoneNumber} | {shippingData.email}</p>
            </div>

            {/* Payment Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm font-semibold text-amber-800">Payment Method: Cash on Delivery (COD)</p>
              <p className="text-xs text-amber-700 mt-1">Admin manual orders are placed as COD by default.</p>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button label="Back" variant="outlinePrimary" onClick={() => setStep(3)} icon={false} />
            <Button
              label={isCreating ? "Placing Order..." : "Place Order"}
              variant="primary"
              icon={true}
              isLoading={isCreating}
              isDisabled={isCreating}
              onClick={handlePlaceOrder}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrder;