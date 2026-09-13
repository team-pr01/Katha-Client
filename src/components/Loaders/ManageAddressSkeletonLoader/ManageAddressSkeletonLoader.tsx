
const ManageAddressSkeletonLoader = () => {
  return (
    <div className="space-y-6 font-Manrope animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-neutral-20 rounded" />
              <div className="h-7 w-48 bg-neutral-20 rounded" />
            </div>
            {/* Subtitle */}
            <div className="h-4 w-64 bg-neutral-20 rounded" />
          </div>

          {/* Add Button */}
          <div className="h-11 w-44 bg-neutral-20 rounded-xl" />
        </div>
      </div>

      {/* Address Card Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-neutral-20" />
            <div>
              {/* Title + Badge */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-32 bg-neutral-20 rounded" />
                <div className="h-5 w-20 bg-neutral-20 rounded-full" />
              </div>
              {/* Subtitle */}
              <div className="h-3 w-48 bg-neutral-20 rounded" />
            </div>
          </div>

          {/* Action Buttons (Edit + Delete) */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-20 rounded-lg" />
            <div className="w-8 h-8 bg-neutral-20 rounded-lg" />
          </div>
        </div>

        {/* Address Details Box */}
        <div className="bg-neutral-20/50 rounded-xl p-5 space-y-3">
          {/* Name Row */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-neutral-20 rounded shrink-0" />
            <div className="h-4 w-40 bg-neutral-20 rounded" />
          </div>

          {/* Phone Row */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-neutral-20 rounded shrink-0" />
            <div className="h-4 w-32 bg-neutral-20 rounded" />
          </div>

          {/* Email Row */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-neutral-20 rounded shrink-0" />
            <div className="h-4 w-52 bg-neutral-20 rounded" />
          </div>

          {/* Address Rows */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 bg-neutral-20 rounded shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full max-w-sm bg-neutral-20 rounded" />
              <div className="h-4 w-3/4 max-w-xs bg-neutral-20 rounded" />
              <div className="h-4 w-2/3 max-w-xs bg-neutral-20 rounded" />
            </div>
          </div>

          {/* Address Type Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-20">
            <div className="h-3 w-20 bg-neutral-20 rounded" />
            <div className="h-5 w-16 bg-neutral-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Pulse Animation */}
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

export default ManageAddressSkeletonLoader;
