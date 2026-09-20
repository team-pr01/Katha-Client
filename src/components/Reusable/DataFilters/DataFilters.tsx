import { FiX } from "react-icons/fi";
import SearchField from "./SearchField";
import SelectField from "./SelectField";
import type { TDataFiltersProps } from "../../../types/dataFilters.types";

const DataFilters = ({
  search,
  selects = [],
  hasActiveFilters,
  onClear,
  extraActions,
}: TDataFiltersProps) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <SearchField
          value={search.value}
          onChange={search.onChange}
          placeholder={search.placeholder}
        />

        <div className="flex flex-wrap items-center gap-2">
          {selects.map((sel) => (
            <SelectField
              key={sel.id}
              value={sel.value}
              onChange={sel.onChange}
              options={sel.options}
              ariaLabel={sel.placeholder}
            />
          ))}

          {hasActiveFilters && onClear && (
            <button
              onClick={onClear}
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

          {extraActions}
        </div>
      </div>
    </div>
  );
};

export default DataFilters;