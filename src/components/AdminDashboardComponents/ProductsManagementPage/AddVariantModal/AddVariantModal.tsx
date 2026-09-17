import { FiX, FiPlus } from "react-icons/fi";

interface AddVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

const AddVariantModal = ({ isOpen, onClose, productId }: AddVariantModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-10/50 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-20 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-45 font-semibold">
              New
            </p>
            <h2 className="text-lg font-bold text-neutral-10 tracking-tight mt-1">
              Add Variant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-45 hover:text-neutral-10 hover:bg-neutral-20 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-8 text-center">
          <div className="size-16 rounded-full bg-primary-10/10 flex items-center justify-center mx-auto mb-4">
            <FiPlus className="text-primary-10" size={24} />
          </div>
          <h3 className="text-sm font-bold text-neutral-10">
            Variant form goes here
          </h3>
          <p className="text-xs text-neutral-45 mt-1.5">
            Product ID: {productId}
          </p>
          <p className="text-xs text-neutral-45 mt-4">
            Wire this modal to a form with all variant fields (name, images,
            dimensions, price, stock, materials, etc.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddVariantModal;