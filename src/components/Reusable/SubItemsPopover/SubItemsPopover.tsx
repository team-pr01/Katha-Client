import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────
export interface TSubItem {
  /** Unique identifier — used as the React key */
  id?: string;
  /** Label shown in the chip */
  label: string;
  /** Optional description shown in the popover */
  description?: string;
  /** Optional custom renderer for the chip / popover item */
  render?: (item: TSubItem) => ReactNode;
}

interface SubItemsPopoverProps {
  /** Items to display */
  items: TSubItem[];
  /** How many to show inline before the "+N more" pill */
  maxVisible?: number;
  /** Label shown in the popover header, e.g. "sub-categories", "sub-occasions" */
  itemLabel?: string;
  /** Content to display when items is empty */
  emptyText?: string;
  /** Optional custom chip renderer */
  renderChip?: (item: TSubItem) => ReactNode;
  /** Optional custom popover item renderer */
  renderPopoverItem?: (item: TSubItem) => ReactNode;
  /** Additional class names for the container */
  className?: string;
}

// ─── Component ────────────────────────────────────────────
const SubItemsPopover = ({
  items,
  maxVisible = 2,
  itemLabel = "items",
  emptyText = "None",
  renderChip,
  renderPopoverItem,
  className = "",
}: SubItemsPopoverProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Empty state
  if (!items || items.length === 0) {
    return (
      <span className="text-xs text-neutral-45 italic">{emptyText}</span>
    );
  }

  const visible = items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);

  // Default chip renderer
  const defaultChip = (item: TSubItem) => (
    <span className="text-[11px] px-2 py-1 rounded-lg bg-neutral-20 text-neutral-10 font-medium whitespace-nowrap">
      {item.label}
    </span>
  );

  // Default popover item renderer
  const defaultPopoverItem = (item: TSubItem) => (
    <span className="text-[11px] px-2 py-1 rounded-lg bg-neutral-20 text-neutral-10 font-medium">
      {item.label}
    </span>
  );

  return (
    <div className={`flex flex-wrap items-center gap-1.5 max-w-70 ${className}`}>
      {/* Visible chips */}
      {visible.map((item) =>
        renderChip ? (
          <span key={item.id}>{renderChip(item)}</span>
        ) : (
          <span key={item.id}>{defaultChip(item)}</span>
        ),
      )}

      {/* Popover trigger */}
      {hidden.length > 0 && (
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-[11px] px-2 py-1 rounded-lg bg-primary-10/10 text-primary-10 font-semibold hover:bg-primary-10/20 transition-colors"
            aria-expanded={open}
            aria-haspopup="true"
          >
            +{hidden.length} more
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1 z-30 w-64 bg-white rounded-xl border border-neutral-20 shadow-xl p-2 max-h-72 overflow-y-auto">
              <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-45 font-semibold">
                All {itemLabel} ({items.length})
              </p>

              {/* If custom popover renderer uses full-width rows, use a column layout */}
              {renderPopoverItem ? (
                <div className="space-y-1 p-1">
                  {items.map((item) => (
                    <div key={item.id}>{renderPopoverItem(item)}</div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 p-1">
                  {items.map((item) =>
                    item.description ? (
                      // If descriptions exist, render as list rows instead of chips
                      <div
                        key={item.id}
                        className="w-full p-2 rounded-lg hover:bg-neutral-20/60 transition-colors"
                      >
                        <p className="text-xs font-semibold text-neutral-10">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-neutral-45 mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <span key={item.id}>
                        {defaultPopoverItem(item)}
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubItemsPopover;