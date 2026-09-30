import { FiX, FiPlus, FiPackage } from "react-icons/fi";
import type { TProduct, TProductVariant } from "../../../../types/product.type";
import {
  useDeleteProductVariantMutation,
  useGetAllVariantsByProductIdQuery,
} from "../../../../redux/Features/Product/productVariantApi";
import { useState } from "react";
import AddOrEditVariantModal from "../AddOrEditVariantModal/AddOrEditVariantModal";
import VariantCardSkeletonLoader from "../../../Loaders/VariantCardSkeletonLoader/VariantCardSkeletonLoader";
import ProductVariantCard from "./ProductVariantCard";
import DeleteConfirmationModal from "../../../Reusable/DeleteConfirmationModal/DeleteConfirmationModal";

interface ProductVariantsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: TProduct | null;
  onAddVariant: () => void;
}

const ProductVariantsDrawer = ({
  isOpen,
  onClose,
  product,
  onAddVariant,
}: ProductVariantsDrawerProps) => {
  const { data, isLoading: isVariantsLoading } =
    useGetAllVariantsByProductIdQuery(product?._id);
  const variants = data?.data?.variants || [];
  const [isAddOrEditVariantModalOpen, setIsAddOrEditVariantModalOpen] =
    useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] =
    useState<TProductVariant | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteProductVariant, { isLoading: isDeleting }] =
    useDeleteProductVariantMutation();
  const handleDeleteVariant = async () => {
    try {
      await deleteProductVariant({
        productId: product?._id,
        variantId: selectedVariant?._id,
      }).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedVariant(null);
    } catch (error) {
      console.error("Error deleting variant:", error);
    }
  };

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
          fixed top-0 right-0 z-50 h-full w-full sm:w-140 bg-white
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
              {product?.variants.length === 1 ? "" : "s"} · {product?.category}{" "}
              › {product?.subCategory}
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
          {/* Skeleton while loading */}
          {isVariantsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <VariantCardSkeletonLoader key={i} />
            ))
          ) : (
            <>
              {/* Real variants */}
              {variants?.map((variant: TProductVariant) => (
                <ProductVariantCard
                  key={variant?._id}
                  productId={product?._id as string}
                  variant={variant}
                  onEdit={() => {
                    setSelectedVariant(variant);
                    setIsAddOrEditVariantModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedVariant(variant);
                    setIsDeleteModalOpen(true);
                  }}
                />
              ))}

              {/* Empty state */}
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
            </>
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

      <AddOrEditVariantModal
        isOpen={isAddOrEditVariantModalOpen}
        onClose={() => setIsAddOrEditVariantModalOpen(false)}
        productId={product?._id || null}
        variant={selectedVariant || null}
      />
      <DeleteConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleDeleteVariant}
        title="Delete this variant?"
        description="Are you sure you want to delete this variant? This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={isDeleting}
      />
    </>
  );
};

export default ProductVariantsDrawer;
