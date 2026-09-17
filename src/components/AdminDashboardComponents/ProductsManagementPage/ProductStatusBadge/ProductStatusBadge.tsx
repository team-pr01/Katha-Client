import { FiCheckCircle, FiEdit3, FiXCircle } from "react-icons/fi";
import type { TProduct } from "../../../../types/product.type";

interface ProductStatusBadgeProps {
  product: TProduct;
}

const ProductStatusBadge = ({ product }: ProductStatusBadgeProps) => {
  if (!product.isActive) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-20 text-neutral-45">
        <FiXCircle size={11} />
        Inactive
      </span>
    );
  }

  if (!product.isPublished) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
        <FiEdit3 size={11} />
        Draft
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
      <FiCheckCircle size={11} />
      Published
    </span>
  );
};

export default ProductStatusBadge;
