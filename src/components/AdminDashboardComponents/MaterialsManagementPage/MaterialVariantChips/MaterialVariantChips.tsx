import { useEffect, useRef, useState } from "react";

interface TMaterialVariantChip {
  _id?: string;
  design: string;
  color: string;
}

interface MaterialVariantChipsProps {
  items: TMaterialVariantChip[];
  maxVisible?: number;
}

const MaterialVariantChips = ({
  items,
  maxVisible = 2,
}: MaterialVariantChipsProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!items || items.length === 0) {
    return <span className="text-xs text-neutral-45 italic">None</span>;
  }

  const visible = items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);

  return (
    <div className="flex flex-wrap items-center gap-1.5 max-w-70">
      {visible.map((v, i) => (
        <span
          key={v._id || i}
          className="text-[11px] px-2 py-1 rounded-lg bg-neutral-20 text-neutral-10 font-medium whitespace-nowrap"
        >
          {v.design} · {v.color}
        </span>
      ))}

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
            <div className="absolute left-0 top-full mt-1 z-30 w-64 bg-white rounded-xl border border-neutral-20 shadow-xl p-3 max-h-64 overflow-y-auto">
              <p className="text-[10px] uppercase tracking-wider text-neutral-45 font-semibold mb-2">
                All variants ({items.length})
              </p>
              <div className="space-y-1.5">
                {items.map((v, i) => (
                  <div
                    key={v._id || i}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-20/60 transition-colors"
                  >
                    <div className="size-2 rounded-full bg-primary-10 shrink-0" />
                    <p className="text-xs font-medium text-neutral-10">
                      {v.design} · {v.color}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialVariantChips;