import { FiBox, FiEdit2, FiPackage, FiTag, FiTrash2 } from "react-icons/fi";
import type { TProductVariant } from "../../../../types/product.type";
import { hasDiscount } from "../../../../utils/productHelpers";

const ProductVariantCard = ({
  variant,
  onEdit,
  onDelete
}: {
  productId: string;
  variant: TProductVariant;
  onEdit: any;
  onDelete: any;
}) => {
 
  return (
    <>
      <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden hover:border-primary-10/40 transition-all group">
        <div className="flex gap-4 p-4">
          {/* Image */}
          <div className="size-20 rounded-xl bg-neutral-20 overflow-hidden shrink-0">
            {variant.images?.[0] ? (
              <img
                src={variant.images[0]}
                alt={variant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FiPackage size={24} className="text-neutral-45" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-neutral-10 truncate">
              {variant.name}
            </h3>
            <p className="text-xs text-neutral-45 mt-0.5 line-clamp-2">
              {variant.description}
            </p>

            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-20 text-neutral-10">
                {variant.size}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-20 text-neutral-10">
                {variant.color}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-20 text-neutral-10">
                {variant.design}
              </span>
              {variant.packSize && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-20 text-neutral-10">
                  {variant.packSize}
                </span>
              )}
            </div>

            {/* Price + stock */}
            <div className="flex items-center justify-between gap-3 mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-neutral-10">
                  ₹
                  {(
                    variant.discountedPrice ?? variant.basePrice
                  ).toLocaleString("en-IN")}
                </span>
                {hasDiscount(variant) && (
                  <span className="text-xs text-neutral-45 line-through">
                    ₹{variant.basePrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <span
                className={`
                    text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${
                      variant.stock === 0
                        ? "bg-red-50 text-red-600"
                        : variant.stock <= 10
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                    }
                  `}
              >
                {variant.stock === 0
                  ? "Out of stock"
                  : `${variant.stock} in stock`}
              </span>
            </div>
          </div>
        </div>

        {/* Actions footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-20/50 border-t border-neutral-20">
          <div className="flex items-center gap-3 text-[10px] text-neutral-45">
            <span className="flex items-center gap-1">
              <FiBox size={10} />
              {variant.dimensions.length}×{variant.dimensions.width}×
              {variant.dimensions.height} {variant.dimensions.unit}
            </span>
            <span className="flex items-center gap-1">
              <FiTag size={10} />
              {variant.weight}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
              aria-label="Edit variant"
            >
              <FiEdit2 size={13} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
              aria-label="Delete variant"
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductVariantCard;
