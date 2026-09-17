import type { TBulkAction } from "../../../../types/bulkActions.types";

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions: TBulkAction[];
}

const BulkActionBar = ({
  selectedCount,
  onClearSelection,
  actions,
}: BulkActionBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-neutral-10 text-white rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-xs text-white/60 hover:text-white transition-colors"
        >
          Clear selection
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all
              ${
                action.variant === "danger"
                  ? "bg-red-500/20 hover:bg-red-500/30 text-red-200"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }
            `}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BulkActionBar;
