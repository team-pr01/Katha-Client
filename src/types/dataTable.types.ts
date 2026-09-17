import type { ReactNode } from "react";

export type TDataTableColumn<T>=  {
  /** Unique key */
  key: string;
  /** Header label */
  header: string;
  /** Render function for each row */
  render: (row: T) => ReactNode;
  /** Optional width class (e.g. "w-32", "min-w-[200px]") */
  widthClass?: string;
  /** Optional className for <th>/<td> */
  className?: string;
  /** Hide at certain breakpoints */
  hiddenAt?: "sm" | "md" | "lg" | "xl";
  /** Align content */
  align?: "left" | "right" | "center";
}

export type TDataTableProps<T> = {
  rows: T[];
  columns: TDataTableColumn<T>[];
  rowKey: (row: T) => string;
  /** Enable selection column */
  selectable?: boolean;
  selectedIds?: string[];
  onSelectToggle?: (id: string) => void;
  onSelectAll?: (checked: boolean) => void;
  /** Loading state */
  loading?: boolean;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Min width for horizontal scroll */
  minWidth?: string;
}