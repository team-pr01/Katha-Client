import type { ReactNode } from "react";

export type TBulkAction = {
    id: string;
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
    icon?: ReactNode;
}