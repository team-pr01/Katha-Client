import { Link } from "react-router-dom";
import { IMAGES } from "../../../assets";
import { FiArrowLeft } from "react-icons/fi";

const ProductInfo = () => {
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
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <Link
        to={`/product/${product.id}`}
        className="inline-flex items-center gap-2 text-sm text-neutral-45 hover:text-primary-10 transition-colors mb-4"
      >
        <FiArrowLeft size={16} />
        Back to Product
      </Link>

      <div className="flex gap-4">
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-neutral-20 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-neutral-10">{product.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-neutral-45">{product.category}</span>
            <span className="text-neutral-50">|</span>
            <div className="flex items-center gap-1">
              <span className="text-primary-10">★</span>
              <span className="text-sm text-neutral-10">{product.rating}</span>
              <span className="text-sm text-neutral-45">
                ({product.reviews})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl font-bold text-neutral-10">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-45 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-45 mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
