import type { ReactNode } from "react";

export type TKPIItem = {
    id: string;
    label: string;
    value: string;
    icon: ReactNode;
    /** Tailwind classes for icon circle, e.g. "bg-blue-50 text-blue-600" */
    accent: string;
    /** Optional sub-metric (trend) */
    trend?: {
        value: number;
        label: string;
    };
}