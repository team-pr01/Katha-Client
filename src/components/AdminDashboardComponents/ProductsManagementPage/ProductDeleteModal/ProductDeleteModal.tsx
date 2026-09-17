import { FiAlertTriangle } from "react-icons/fi";

interface ProductDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
  isLoading?: boolean;
}

const ProductDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  isLoading,
}: ProductDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-10/50 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 text-center">
        <div className="size-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="text-red-500" size={28} />
        </div>
        <h2 className="text-lg font-bold text-neutral-10">
          Delete this product?
        </h2>
        <p className="text-sm text-neutral-45 mt-1.5">
          Are you sure you want to delete
          {productName ? (
            <>
              {" "}
              <span className="font-semibold text-neutral-10">
                "{productName}"
              </span>
            </>
          ) : (
            " this product"
          )}
          ? This action cannot be undone.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 rounded-xl border-2 border-neutral-20 text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting…
              </>
            ) : (
              "Delete Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
