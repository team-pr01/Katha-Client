const DashboardHomeSkeletonLoader = () => {
  return (
    <div className="space-y-6 font-Manrope animate-pulse">
      {/* Profile Card Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="size-24 rounded-full bg-neutral-20 border-4 border-white shadow-lg" />

          {/* User Info */}
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Name */}
                <div className="h-6 w-40 bg-neutral-20 rounded mb-3" />
                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="h-4 w-48 bg-neutral-20 rounded" />
                  <div className="h-4 w-32 bg-neutral-20 rounded" />
                  <div className="h-4 w-40 bg-neutral-20 rounded" />
                </div>
              </div>
              {/* Edit Button */}
              <div className="hidden md:block h-10 w-32 bg-neutral-20 rounded-xl" />
            </div>
            {/* Mobile Edit Button */}
            <div className="md:hidden h-10 w-full bg-neutral-20 rounded-xl mt-4" />
          </div>
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl shadow-sm p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-20" />
              <div className="flex-1">
                <div className="h-3 w-20 bg-neutral-20 rounded mb-2" />
                <div className="h-5 w-10 bg-neutral-20 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders + Address Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-36 bg-neutral-20 rounded" />
            <div className="h-4 w-20 bg-neutral-20 rounded" />
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-3 rounded-xl border border-neutral-20"
              >
                {/* Image */}
                <div className="w-14 h-14 rounded-lg bg-neutral-20 shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-24 bg-neutral-20 rounded" />
                    <div className="h-5 w-20 bg-neutral-20 rounded-full" />
                  </div>
                  <div className="h-3 w-40 bg-neutral-20 rounded" />
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="h-4 w-16 bg-neutral-20 rounded mb-2" />
                  <div className="h-4 w-4 bg-neutral-20 rounded ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-36 bg-neutral-20 rounded" />
            <div className="h-4 w-12 bg-neutral-20 rounded" />
          </div>

          {/* Address Box */}
          <div className="flex items-start gap-3 p-4 bg-neutral-20/50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-neutral-20 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-28 bg-neutral-20 rounded" />
              <div className="h-3 w-full bg-neutral-20 rounded" />
              <div className="h-3 w-3/4 bg-neutral-20 rounded" />
              <div className="h-3 w-2/3 bg-neutral-20 rounded" />
              <div className="h-3 w-32 bg-neutral-20 rounded" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-neutral-20">
            <div className="h-4 w-28 bg-neutral-20 rounded mb-3" />
            <div className="space-y-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-neutral-20 rounded" />
                    <div className="h-4 w-28 bg-neutral-20 rounded" />
                  </div>
                  <div className="w-4 h-4 bg-neutral-20 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer Animation */}
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

export default DashboardHomeSkeletonLoader;