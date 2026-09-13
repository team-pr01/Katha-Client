const MyOrdersSkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Order Header */}
          <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Order ID */}
                  <div className="h-5 w-32 bg-neutral-20 rounded" />
                  {/* Status Badge */}
                  <div className="h-6 w-24 bg-neutral-20 rounded-full" />
                </div>

                {/* Meta Info Row */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="h-3 w-32 bg-neutral-20 rounded" />
                  <div className="h-3 w-20 bg-neutral-20 rounded" />
                  <div className="h-3 w-24 bg-neutral-20 rounded" />
                </div>
              </div>

              {/* Amount + Actions */}
              <div className="flex items-center gap-4">
                <div className="text-right space-y-1">
                  <div className="h-3 w-20 bg-neutral-20 rounded ml-auto" />
                  <div className="h-6 w-20 bg-neutral-20 rounded ml-auto" />
                </div>
                <div className="h-10 w-32 bg-neutral-20 rounded-xl" />
              </div>
            </div>

            {/* Product Preview */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-20">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((img) => (
                  <div
                    key={img}
                    className="w-12 h-12 rounded-lg bg-neutral-20 border-2 border-white"
                  />
                ))}
              </div>
              <div className="h-4 flex-1 max-w-xs bg-neutral-20 rounded" />
            </div>
          </div>
        </div>
      ))}

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

export default MyOrdersSkeletonLoader;