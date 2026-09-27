const AddOrEditProductSkeleton = () => {
  return (
    <div className="space-y-5 font-Manrope animate-pulse">
      {/* Header */}
      <div>
        <div className="h-3 w-24 bg-white rounded mb-2" />
        <div className="h-8 w-56 bg-white rounded mb-2" />
        <div className="h-4 w-80 bg-white rounded" />
      </div>

      {/* Info banner */}
      <div className="bg-neutral-20/50 border border-white rounded-2xl px-5 py-3.5 flex items-start gap-3">
        <div className="size-2 rounded-full bg-white mt-1.5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-full bg-white rounded" />
          <div className="h-3 w-3/4 bg-white rounded" />
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-neutral-20 p-5 md:p-6">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-5 bg-neutral-20 rounded-full" />
          <div className="h-4 w-40 bg-neutral-20 rounded" />
        </div>

        {/* Basic info grid — 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 w-24 bg-neutral-20 rounded mb-2" />
              <div className="h-11 w-full bg-neutral-20 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Occasions */}
        <div className="mt-6 pt-5 border-t border-neutral-20">
          <div className="h-3 w-28 bg-neutral-20 rounded mb-3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-9 bg-neutral-20 rounded-xl"
                style={{ width: `${60 + (i % 3) * 20}px` }}
              />
            ))}
          </div>
        </div>

        {/* Sub-occasions */}
        <div className="mt-5">
          <div className="h-3 w-32 bg-neutral-20 rounded mb-3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 bg-neutral-20 rounded-xl"
                style={{ width: `${70 + (i % 2) * 20}px` }}
              />
            ))}
          </div>
        </div>

        {/* Care instructions */}
        <div className="mt-6 pt-5 border-t border-neutral-20">
          <div className="h-3 w-36 bg-neutral-20 rounded mb-3" />
          <div className="flex flex-wrap gap-2 mb-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-8 bg-neutral-20 rounded-lg"
                style={{ width: `${90 + i * 30}px` }}
              />
            ))}
          </div>
          <div className="h-11 w-full bg-neutral-20 rounded-lg" />
        </div>

        {/* Tags */}
        <div className="mt-6">
          <div className="h-3 w-16 bg-neutral-20 rounded mb-3" />
          <div className="flex flex-wrap gap-2 mb-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 bg-neutral-20 rounded-lg"
                style={{ width: `${60 + i * 20}px` }}
              />
            ))}
          </div>
          <div className="h-11 w-full bg-neutral-20 rounded-lg" />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6 mt-6 pt-5 border-t border-neutral-20">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-neutral-20 rounded" />
            <div className="h-4 w-44 bg-neutral-20 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <div className="size-4 bg-neutral-20 rounded" />
            <div className="h-4 w-32 bg-neutral-20 rounded" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
        <div className="h-12 w-full sm:w-28 bg-neutral-20 rounded-xl" />
        <div className="h-12 w-full sm:w-40 bg-neutral-20 rounded-xl" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AddOrEditProductSkeleton;