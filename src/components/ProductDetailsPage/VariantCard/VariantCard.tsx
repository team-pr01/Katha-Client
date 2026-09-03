import { IMAGES } from "../../../assets";
import type { TProductVariant } from "../../../types/product.type";

interface VariantCardProps {
  variant: TProductVariant;
  selectedVariant: TProductVariant | null;
  setSelectedVariant: (variant: TProductVariant) => void;
}

const VariantCard = ({
  variant,
  setSelectedVariant,
  selectedVariant,
}: VariantCardProps) => {
  const isSelected = selectedVariant?._id === variant._id;
  const inStock = variant.stock > 0;

  // Get image from variant (support both images and imageUrls fields)
  const imageUrl =
    variant?.images?.[0] || variant?.images?.[0] || IMAGES.productPlaceholder;

  return (
    <button
      onClick={() => inStock && setSelectedVariant(variant)}
      disabled={!inStock}
      className={`
        relative group rounded-md overflow-hidden border-2 transition-all duration-300 text-left w-28 shrink-0
        ${
          isSelected
            ? "border-primary-10 shadow-lg"
            : inStock
              ? "border-neutral-20 hover:border-primary-10 hover:shadow-md"
              : "border-neutral-20 opacity-50 cursor-not-allowed"
        }
      `}
    >
      {/* Image Container - Square 1:1 */}
      <div className="relative w-full aspect-square bg-neutral-20 overflow-hidden">
        <img
          src={imageUrl}
          alt={variant.name || variant.size || "Variant"}
          className={`
            w-full h-full object-cover transition-transform duration-500
            ${isSelected ? "scale-105" : "group-hover:scale-105"}
          `}
        />

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-semibold bg-red-500 px-2 py-0.5 rounded">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 bg-white">
        <p className="text-xs text-neutral-10 text-center mt-0.5 font-medium">
          <span className="text-neutral-45">Size:</span>{" "}
          <span className="font-semibold text-neutral-5">{variant.size}</span>
        </p>
        <p className="text-xs text-neutral-10 text-center mt-0.5 font-medium">
          <span className="text-neutral-45">Color:</span>{" "}
          <span className="font-semibold text-neutral-5">{variant.color}</span>
        </p>
        <p className="text-xs text-primary-10 text-center mt-0.5 font-bold">
          ₹{variant.discountedPrice || variant.basePrice}
        </p>
      </div>
    </button>
  );
};

export default VariantCard;
