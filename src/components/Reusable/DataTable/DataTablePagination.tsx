import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  limitOptions?: number[];
}

const DataTablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  limit,
  setLimit,
  limitOptions = [10, 20, 50, 100],
}: DataTablePaginationProps) => {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Show max 5 page buttons with ellipsis
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    onPageChange(1); // Reset to page 1 whenever limit changes
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left: Limit selector + entries info */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-45">Show</span>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="
              px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-white border border-neutral-20 text-neutral-10
              hover:border-primary-10/40
              focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent
              transition-all cursor-pointer
            "
            aria-label="Items per page"
          >
            {limitOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="text-xs text-neutral-45">entries</span>
        </div>

        <p className="text-xs text-neutral-45">
          Showing <span className="font-semibold text-neutral-10">{start}</span>{" "}
          to <span className="font-semibold text-neutral-10">{end}</span> of{" "}
          <span className="font-semibold text-neutral-10">{totalItems}</span>
        </p>
      </div>

      {/* Right: Page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-neutral-20 text-neutral-10 hover:bg-neutral-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <FiChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="size-9 flex items-center justify-center text-xs text-neutral-45"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                size-9 rounded-xl text-xs font-semibold transition-all
                ${
                  currentPage === page
                    ? "bg-primary-10 text-white shadow-md shadow-primary-10/20"
                    : "text-neutral-10 hover:bg-neutral-20"
                }
              `}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-neutral-20 text-neutral-10 hover:bg-neutral-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DataTablePagination;