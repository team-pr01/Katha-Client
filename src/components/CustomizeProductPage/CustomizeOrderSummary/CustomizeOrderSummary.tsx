import { FiCheck, FiHeart, FiInfo, FiPackage } from "react-icons/fi";
import { IMAGES } from "../../../assets";

const CustomizeOrderSummary = () => {
  const product = {
    id: "1",
    name: "The Jewel Embedded Brass Elephant",
    image: IMAGES.farewell,
    price: 200,
    originalPrice: 2000,
    rating: 4.5,
    reviews: 13,
    category: "BRASS",
    description:
      "Handcrafted brass elephant adorned with intricate jewel embellishments, bringing timeless elegance, cultural charm.",
    availableSizes: ["Classic", "Small", "Medium", "Large"],
    availableColors: ["Gold", "Antique Gold", "Rose Gold", "Silver"],
    availableMaterials: ["Brass", "Copper", "Bronze"],
  };
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
        <h3 className="text-lg font-semibold text-neutral-10 mb-4 flex items-center gap-2">
          <FiPackage className="text-primary-10" />
          Customization Summary
        </h3>

        {/* Product Summary */}
        <div className="flex gap-3 pb-4 border-b border-neutral-50 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 rounded-lg object-cover bg-neutral-20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-10 line-clamp-2">
              {product.name}
            </p>
            <p className="text-sm font-bold text-neutral-10 mt-1">
              ₹{product.price}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-neutral-45 line-through">
                ₹{product.originalPrice}
              </p>
            )}
          </div>
        </div>

        {/* Estimated Timeline */}
        <div className="bg-neutral-20 rounded-xl p-4 mb-4">
          <h4 className="text-sm font-medium text-neutral-10 mb-2">
            Estimated Timeline
          </h4>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-45">Processing</span>
              <span className="text-neutral-10 font-medium">1-2 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-45">Production</span>
              <span className="text-neutral-10 font-medium">3-5 days</span>
            </div>
            <div className="flex justify-between border-t border-neutral-50 pt-1.5 mt-1.5">
              <span className="text-neutral-45 font-medium">Total Time</span>
              <span className="text-primary-10 font-bold">4-7 days</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
          <FiInfo className="text-blue-500 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-blue-700">
            Our team will contact you to confirm the customization details and
            provide a final quote.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
            <FiHeart className="text-primary-10" />
            <span className="text-xs text-neutral-45 mt-1 text-center">
              100% Custom
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-neutral-20 rounded-lg">
            <FiCheck className="text-primary-10" />
            <span className="text-xs text-neutral-45 mt-1 text-center">
              Expert Craftsmanship
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeOrderSummary;
