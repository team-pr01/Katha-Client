
const ProductCardSkeletonLoader = () => {
  return (
    <div className="rounded-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="relative rounded-lg overflow-hidden bg-neutral-20 w-full h-55">
        <div className="absolute inset-0 bg-linear-to-r from-neutral-20 via-neutral-50 to-neutral-20 shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="mt-2 space-y-2">
        {/* Title */}
        <div className="h-5 w-3/4 bg-neutral-50 rounded animate-pulse" />

        {/* Rating Skeleton */}
        <div className="flex items-center gap-1 mt-2">
          <div className="h-4 w-16 bg-neutral-50 rounded animate-pulse" />
          <div className="h-4 w-4 bg-neutral-50 rounded animate-pulse" />
          <div className="h-4 w-12 bg-neutral-50 rounded animate-pulse" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-5 w-16 bg-neutral-50 rounded animate-pulse" />
          <div className="h-4 w-14 bg-neutral-50 rounded animate-pulse" />
          <div className="h-4 w-12 bg-neutral-50 rounded animate-pulse" />
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className="h-6 w-24 bg-neutral-50 rounded animate-pulse mt-2" />
      </div>

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

        .shimmer {
          animation: shimmer 2s infinite linear;
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCardSkeletonLoader;
