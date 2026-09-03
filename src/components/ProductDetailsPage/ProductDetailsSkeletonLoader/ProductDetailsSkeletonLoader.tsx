import React from "react";
import Container from "../../Reusable/Container/Container";

const ProductDetailsSkeletonLoader: React.FC = () => {
  return (
    <div className="bg-neutral-20 min-h-screen py-8 font-Manrope">
      <Container>
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Images Skeleton */}
            <div className="lg:w-1/2">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-neutral-20 aspect-square animate-pulse">
                <div className="absolute inset-0 bg-linear-to-r from-neutral-20 via-neutral-50 to-neutral-20 shimmer" />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="shrink-0 w-20 h-20 rounded-lg bg-neutral-20 animate-pulse"
                  >
                    <div className="w-full h-full bg-linear-to-r from-neutral-20 via-neutral-50 to-neutral-20 shimmer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info Skeleton */}
            <div className="lg:w-1/2">
              {/* Breadcrumb Skeleton */}
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-neutral-20 rounded animate-pulse" />
                    {index < 3 && <div className="h-4 w-2 bg-neutral-20 rounded animate-pulse" />}
                  </div>
                ))}
              </div>

              {/* Title Skeleton */}
              <div className="flex justify-between items-start mb-2">
                <div className="h-8 w-3/4 bg-neutral-20 rounded animate-pulse" />
                <div className="h-10 w-10 bg-neutral-20 rounded-lg animate-pulse" />
              </div>

              {/* Rating Skeleton */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-5 w-32 bg-neutral-20 rounded animate-pulse" />
                <div className="h-5 w-20 bg-neutral-20 rounded animate-pulse" />
                <div className="h-5 w-16 bg-neutral-20 rounded animate-pulse" />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-neutral-20 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-neutral-20 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-neutral-20 rounded animate-pulse" />
              </div>

              {/* Price Skeleton */}
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-24 bg-neutral-20 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-neutral-20 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-neutral-20 rounded-full animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-neutral-20 rounded mt-1 animate-pulse" />
                <div className="h-4 w-24 bg-neutral-20 rounded mt-1 animate-pulse" />
              </div>

              {/* Variants Skeleton */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 w-32 bg-neutral-20 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-neutral-20 rounded animate-pulse" />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="shrink-0 w-28 rounded-lg bg-neutral-20 animate-pulse"
                    >
                      <div className="aspect-square bg-neutral-20 rounded-t-lg" />
                      <div className="p-2 space-y-1">
                        <div className="h-3 w-16 bg-neutral-50 rounded mx-auto" />
                        <div className="h-3 w-12 bg-neutral-50 rounded mx-auto" />
                        <div className="h-3 w-14 bg-neutral-50 rounded mx-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Skeleton */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-5 w-10 bg-neutral-20 rounded animate-pulse" />
                <div className="flex items-center border border-neutral-50 rounded-lg overflow-hidden">
                  <div className="h-9 w-9 bg-neutral-20 animate-pulse" />
                  <div className="h-9 w-12 bg-neutral-20 animate-pulse" />
                  <div className="h-9 w-9 bg-neutral-20 animate-pulse" />
                </div>
                <div className="h-4 w-20 bg-neutral-20 rounded animate-pulse" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="h-11 w-24 bg-neutral-20 rounded-lg animate-pulse" />
                <div className="flex-1 h-11 bg-neutral-20 rounded-lg animate-pulse" />
              </div>

              {/* Customize Button Skeleton */}
              <div className="mb-6">
                <div className="h-11 w-full bg-neutral-20 rounded-lg border-2 border-dashed border-neutral-50 animate-pulse" />
              </div>

              {/* Attributes Skeleton */}
              <div className="border border-neutral-50/70 rounded-xl p-5 my-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-neutral-20 rounded-full animate-pulse" />
                  <div className="h-5 w-32 bg-neutral-20 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="flex items-center gap-2 py-2 px-3">
                      <div className="h-4 w-20 bg-neutral-20 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-neutral-20 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging Options Skeleton */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-6 w-32 bg-neutral-20 rounded animate-pulse" />
                    <div className="h-4 w-48 bg-neutral-20 rounded mt-1 animate-pulse" />
                  </div>
                  <div className="h-8 w-24 bg-neutral-20 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="relative p-4 rounded-xl border-2 border-neutral-50/40">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-20 animate-pulse" />
                        <div className="flex-1">
                          <div className="h-5 w-24 bg-neutral-20 rounded animate-pulse" />
                          <div className="h-3 w-32 bg-neutral-20 rounded mt-1 animate-pulse" />
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-50">
                            <div className="h-4 w-16 bg-neutral-20 rounded animate-pulse" />
                            <div className="h-5 w-20 bg-neutral-20 rounded-full animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 mt-6">
          <div className="flex border-b border-neutral-50 mb-6">
            <div className="px-6 py-3">
              <div className="h-5 w-32 bg-neutral-20 rounded animate-pulse" />
            </div>
            <div className="px-6 py-3">
              <div className="h-5 w-24 bg-neutral-20 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-neutral-20 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-neutral-20 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-neutral-20 rounded animate-pulse" />
            <div className="space-y-2 mt-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="h-4 w-40 bg-neutral-20 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Shimmer Animation CSS */}
      <style>{`
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

export default ProductDetailsSkeletonLoader;