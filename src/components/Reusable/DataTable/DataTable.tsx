import type { TDataTableProps } from "../../../types/dataTable.types";
import DataTableHead from "./DataTableHead";

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

const DataTable = <T,>({
  rows,
  columns,
  rowKey,
  selectable,
  selectedIds = [],
  onSelectToggle,
  onSelectAll,
  onRowClick,
  minWidth = "900px",
}: TDataTableProps<T>) => {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth }}>
          <DataTableHead
            columns={columns}
            selectable={selectable}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={onSelectAll}
          />
          <tbody>
            {rows.map((row) => {
              const id = rowKey(row);
              const isSelected = selectedIds.includes(id);

              return (
                <tr
                  key={id}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    group border-b border-neutral-20 last:border-0
                    transition-colors duration-150
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${isSelected ? "bg-primary-10/5" : "hover:bg-neutral-20/40"}
                  `}
                >
                  {selectable && (
                    <td
                      className="px-4 py-3 w-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectToggle?.(id)}
                        className="size-4 rounded border-neutral-45 cursor-pointer text-primary-10 focus:ring-primary-10 focus:ring-offset-0"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`
                        px-4 py-3 
                        ${col.hiddenAt ? breakpointMap[col.hiddenAt] : ""}
                        ${alignMap[col.align || "left"]}
                        ${col.className || ""}
                      `}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
