import type { TDataTableColumn } from "../../../types/dataTable.types";

interface DataTableHeadProps<T> {
  columns: TDataTableColumn<T>[];
  selectable?: boolean;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll?: (checked: boolean) => void;
}

const breakpointMap = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

const alignMap = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

const DataTableHead = <T,>({
  columns,
  selectable,
  allSelected,
  someSelected,
  onSelectAll,
}: DataTableHeadProps<T>) => {
  return (
    <thead className="bg-neutral-20/50 border-b border-neutral-20">
      <tr className="text-[11px] uppercase tracking-wider text-neutral-45 font-semibold">
        {selectable && (
          <th className="px-4 py-3 w-10">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={(e) => onSelectAll?.(e.target.checked)}
              className="size-4 rounded border-neutral-45 cursor-pointer text-primary-10 focus:ring-primary-10 focus:ring-offset-0"
            />
          </th>
        )}
        {columns.map((col) => (
          <th
            key={col.key}
            className={`
              px-4 py-3 
              ${col.widthClass || ""}
              ${col.hiddenAt ? breakpointMap[col.hiddenAt] : ""}
              ${alignMap[col.align || "left"]}
            `}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHead;
