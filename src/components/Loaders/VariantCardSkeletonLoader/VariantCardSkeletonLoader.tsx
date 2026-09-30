const VariantCardSkeletonLoader = () => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden animate-pulse">
      {/* Main body */}
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="size-20 rounded-xl bg-neutral-20 shrink-0" />

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <div className="h-4 w-40 bg-neutral-20 rounded mb-2" />

          {/* Description — 2 lines */}
          <div className="space-y-1.5">
            <div className="h-3 w-full bg-neutral-20 rounded" />
            <div className="h-3 w-3/4 bg-neutral-20 rounded" />
          </div>

          {/* Meta tags — 4 chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <div className="h-5 w-14 bg-neutral-20 rounded-full" />
            <div className="h-5 w-12 bg-neutral-20 rounded-full" />
            <div className="h-5 w-16 bg-neutral-20 rounded-full" />
            <div className="h-5 w-14 bg-neutral-20 rounded-full" />
          </div>

          {/* Price + stock */}
          <div className="flex items-center justify-between gap-3 mt-3">
            <div className="flex items-baseline gap-1.5">
              <div className="h-5 w-16 bg-neutral-20 rounded" />
              <div className="h-3 w-12 bg-neutral-20 rounded" />
            </div>
            <div className="h-5 w-20 bg-neutral-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-20/50 border-t border-neutral-20">
        <div className="flex items-center gap-3">
          <div className="h-3 w-20 bg-neutral-20 rounded" />
          <div className="h-3 w-12 bg-neutral-20 rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="size-6 bg-neutral-20 rounded-lg" />
          <div className="size-6 bg-neutral-20 rounded-lg" />
        </div>
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

export default VariantCardSkeletonLoader;
