import { useEffect, useRef, useState } from "react";

interface CategorySubChipsProps {
  items: string[];
  maxVisible?: number;
}

const CategorySubChips = ({
  items,
  maxVisible = 2,
}: CategorySubChipsProps) => {
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

  if (!items || items.length === 0) {
    return <span className="text-xs text-neutral-45 italic">None</span>;
  }

  const visible = items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);

  return (
    <div className="flex flex-wrap items-center gap-1.5 max-w-70">
      {visible.map((item) => (
        <span
          key={item}
          className="text-[11px] px-2 py-1 rounded-lg bg-neutral-20 text-neutral-10 font-medium whitespace-nowrap"
        >
          {item}
        </span>
      ))}

      {hidden.length > 0 && (
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-[11px] px-2 py-1 rounded-lg bg-primary-10/10 text-primary-10 font-semibold hover:bg-primary-10/20 transition-colors"
          >
            +{hidden.length} more
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-1 z-30 w-56 bg-white rounded-xl border border-neutral-20 shadow-xl p-2 max-h-64 overflow-y-auto">
              <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-45 font-semibold">
                All sub-categories ({items.length})
              </p>
              <div className="flex flex-wrap gap-1.5 p-1">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-2 py-1 rounded-lg bg-neutral-20 text-neutral-10 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySubChips;