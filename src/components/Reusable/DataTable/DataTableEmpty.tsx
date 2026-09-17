import type { ReactNode } from "react";

interface DataTableEmptyProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "no-data" | "no-match";
}

const DataTableEmpty = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "no-data",
}: DataTableEmptyProps) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="size-20 rounded-full bg-neutral-20 flex items-center justify-center mx-auto mb-5">
          <span className="text-neutral-45">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-neutral-10">{title}</h3>
        <p className="text-sm text-neutral-45 mt-1.5">{description}</p>
        {variant === "no-match" && onAction && actionLabel && (
          <button
            onClick={onAction}
            className="mt-5 px-5 py-2.5 rounded-xl bg-primary-10 text-white text-sm font-medium hover:bg-[#d4892a] transition-all"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default DataTableEmpty;
