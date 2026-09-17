import type { ReactNode } from "react";

export type TFilterOption = {
    value: string;
    label: string;
}

export type TSelectFilter = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: TFilterOption[];
    placeholder?: string;
}

export type TDataFiltersProps = {
    search: {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    };
    selects?: TSelectFilter[];
    hasActiveFilters?: boolean;
    onClear?: () => void;
    onExport?: () => void;
    extraActions?: ReactNode;
}