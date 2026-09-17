import {
  FiX,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiTag,
  FiBox,
} from "react-icons/fi";
import type { TProduct, TProductVariant } from "../../../../types/product.type";
import { hasDiscount } from "../../../../utils/productHelpers";

interface ProductVariantsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: TProduct | null;
  onAddVariant: () => void;
  onEditVariant: (variant: TProductVariant) => void;
  onDeleteVariant: (variantId: string) => void;
}

const ProductVariantsDrawer = ({
  isOpen,
  onClose,
  product,
  onAddVariant,
  onEditVariant,
  onDeleteVariant,
}: ProductVariantsDrawerProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-neutral-10/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-full sm:w-[560px] bg-white
          shadow-2xl flex flex-col
          transition-transform duration-500 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-20 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
              Variants
            </p>
            <h2 className="text-lg font-bold text-neutral-10 tracking-tight mt-1 truncate">
              {product?.name}
            </h2>
            <p className="text-xs text-neutral-45 mt-0.5">
              {product?.variants.length} variant
              {product?.variants.length === 1 ? "" : "s"} ·{" "}
              {product?.category} › {product?.subCategory}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20 transition-all shrink-0"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {product?.variants.map((variant) => (
            <div
              key={variant._id}
              className="bg-white rounded-2xl border border-neutral-20 overflow-hidden hover:border-primary-10/40 transition-all group"
            >
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
                    onClick={() => onEditVariant(variant)}
                    className="p-1.5 rounded-lg text-neutral-45 hover:text-primary-10 hover:bg-primary-10/10 transition-all"
                    aria-label="Edit variant"
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    onClick={() => onDeleteVariant(variant._id)}
                    className="p-1.5 rounded-lg text-neutral-45 hover:text-red-500 hover:bg-red-50 transition-all"
                    aria-label="Delete variant"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {product?.variants.length === 0 && (
            <div className="text-center py-12">
              <div className="size-16 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-4">
                <FiPackage size={24} className="text-neutral-45" />
              </div>
              <h3 className="text-sm font-bold text-neutral-10">
                No variants yet
              </h3>
              <p className="text-xs text-neutral-45 mt-1">
                Add the first variant to start selling this product.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-20">
          <button
            onClick={onAddVariant}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-10 text-white text-sm font-semibold hover:bg-[#d4892a] transition-all shadow-md shadow-primary-10/20"
          >
            <FiPlus size={16} />
            Add Variant
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductVariantsDrawer;