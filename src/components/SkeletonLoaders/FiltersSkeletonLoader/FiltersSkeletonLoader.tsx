import React from "react";

const FiltersSkeletonLoader: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 font-Manrope">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-16 bg-neutral-20 rounded animate-pulse" />
        <div className="h-5 w-14 bg-neutral-20 rounded-full animate-pulse" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-20 h-11 animate-pulse" />
      </div>

      {/* Filter Sections */}
      {[1, 2, 3, 4, 5].map((section) => (
        <div key={section} className="border-b border-neutral-50 py-4 last:border-b-0">
          {/* Section Header */}
          <div className="flex items-center justify-between w-full">
            <div className="h-4 w-24 bg-neutral-20 rounded animate-pulse" />
            <div className="h-4 w-4 bg-neutral-20 rounded animate-pulse" />
          </div>

          {/* Section Items - 4-5 items per section */}
          <div className="mt-3 space-y-2.5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Checkbox */}
                  <div className="w-5 h-5 rounded border-2 border-neutral-20 bg-neutral-20 animate-pulse" />
                  {/* Label */}
                  <div className="h-4 w-20 bg-neutral-20 rounded animate-pulse" />
                </div>
                {/* Count */}
                <div className="h-3 w-8 bg-neutral-20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Show More Button */}
      <div className="mt-1">
        <div className="h-4 w-16 bg-neutral-20 rounded animate-pulse" />
      </div>

      {/* Clear Filters Button */}
      <div className="mt-6">
        <div className="h-4 w-32 bg-neutral-20 rounded animate-pulse" />
      </div>

      {/* Shimmer Animation CSS */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default FiltersSkeletonLoader;