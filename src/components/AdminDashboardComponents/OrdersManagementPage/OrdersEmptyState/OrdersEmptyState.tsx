import { FiPackage } from "react-icons/fi";

interface OrdersEmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

const OrdersEmptyState = ({ hasFilters, onClearFilters }: OrdersEmptyStateProps) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="size-20 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-5">
          <FiPackage size={32} className="text-neutral-45" />
        </div>
        <h3 className="text-lg font-bold text-neutral-10">
          No orders found
        </h3>
        <p className="text-sm text-neutral-45 mt-1.5">
          {hasFilters
            ? "No orders match your current filters. Try adjusting them."
            : "You haven't received any orders yet."}
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="
              mt-5 px-5 py-2.5 rounded-xl
              bg-primary-10 text-white text-sm font-medium
              hover:bg-[#d4892a] transition-all
            "
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default OrdersEmptyState;