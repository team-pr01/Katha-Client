import { FiSearch, FiDownload, FiX } from "react-icons/fi";
import type { TOrderStatus } from "../../../../types/orders.types";
import { orderStatusOptions } from "../../../../config/orderStatusConfig";

interface OrdersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: TOrderStatus | "all";
  onStatusChange: (value: TOrderStatus | "all") => void;
  dateRange: "all" | "today" | "week" | "month";
  onDateRangeChange: (value: "all" | "today" | "week" | "month") => void;
  onClearFilters: () => void;
  onExport?: () => void;
  hasActiveFilters: boolean;
}

const dateRangeOptions = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
] as const;

const OrdersFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
  onExport,
  hasActiveFilters,
}: OrdersFiltersProps) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-45"
            size={16}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by order ID, customer name, email, phone…"
            className="
              w-full pl-10 pr-4 py-2.5 rounded-xl 
              bg-neutral-20/60 border border-transparent
              text-sm text-neutral-10 placeholder:text-neutral-45
              focus:outline-none focus:bg-white focus:border-primary-10/40
              transition-all
            "
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as TOrderStatus | "all")}
            className="
              px-3.5 py-2.5 rounded-xl 
              bg-neutral-20/60 border border-transparent
              text-sm text-neutral-10
              focus:outline-none focus:bg-white focus:border-primary-10/40
              transition-all cursor-pointer
            "
          >
            {orderStatusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) =>
              onDateRangeChange(e.target.value as "all" | "today" | "week" | "month")
            }
            className="
              px-3.5 py-2.5 rounded-xl 
              bg-neutral-20/60 border border-transparent
              text-sm text-neutral-10
              focus:outline-none focus:bg-white focus:border-primary-10/40
              transition-all cursor-pointer
            "
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="
                flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
                text-sm font-medium text-neutral-45 
                hover:text-red-500 hover:bg-red-50
                transition-all
              "
            >
              <FiX size={14} />
              Clear
            </button>
          )}

          {/* Export */}
          {onExport && (
            <button
              onClick={onExport}
              className="
                flex items-center gap-2 px-3.5 py-2.5 rounded-xl
                bg-neutral-20/60 text-sm font-medium text-neutral-10
                hover:bg-neutral-20 transition-all
              "
            >
              <FiDownload size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersFilters;