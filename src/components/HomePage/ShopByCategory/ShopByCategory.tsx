import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { useGetAllCategoriesQuery } from "../../../redux/Features/Category/categoryApi";

const ShopByCategory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useGetAllCategoriesQuery({});
  const categories = data?.data?.data || [];

  // Optional: reset scroll on mount
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, []);

  const loading = isLoading || isFetching;

  return (
    <section className="bg-neutral-20 font-Manrope py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header — centered editorial style */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          {/* Small top label with lines on both sides */}
          <div className="flex items-center gap-4 mb-5">
            <span className="w-10 h-px bg-neutral-45/40" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-neutral-45 font-medium">
              Categories
            </span>
            <span className="w-10 h-px bg-neutral-45/40" />
          </div>

          {/* Big heading with italic accent */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-10 leading-[0.95] tracking-tight max-w-4xl">
            Explore our
            <span className="block italic font-light text-primary-10 mt-2">
              curated collections
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-neutral-45 mt-6 max-w-xl">
            From timeless brass to hand-carved wood — discover crafts that tell
            a story.
          </p>
        </div>

        {/* Horizontal Scroll — swipe only */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto overflow-y-hidden pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/*  Skeleton Loader */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="shrink-0 snap-center flex flex-col items-center text-center w-40 md:w-45 animate-pulse"
              >
                {/* Circle image skeleton */}
                <div className="size-32 md:size-40 rounded-full bg-neutral-50" />

                {/* Name skeleton */}
                <div className="h-4 w-24 bg-neutral-50 rounded mt-5" />

                {/* Description skeleton */}
                <div className="h-3 w-28 bg-neutral-50 rounded mt-2" />
                <div className="h-3 w-20 bg-neutral-50 rounded mt-1.5" />
              </div>
            ))}

          {/*  Categories */}
          {!loading &&
            categories.map((category: any) => (
              <Link
                key={category?._id}
                to={`/products?category=${category?.name}`}
                className="group shrink-0 snap-center flex flex-col items-center text-center w-40 md:w-45"
              >
                {/* Image — circle with subtle ring */}
                <div className="relative">
                  {/* Outer ring on hover */}
                  <div className="absolute inset-0 rounded-full border border-neutral-45/0 group-hover:border-primary-10/40 group-hover:scale-110 transition-all duration-500" />

                  <img
                    src={category?.imageUrl}
                    alt={category?.name}
                    loading="lazy"
                    className="size-32 md:size-40 rounded-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <h3 className="text-base md:text-lg font-bold text-neutral-10 tracking-tight group-hover:text-primary-10 transition-colors mt-5">
                  {category?.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-45 mt-1.5 line-clamp-2">
                  {category?.description}
                </p>
              </Link>
            ))}
        </div>

        {/* Swipe hint — only when there are items */}
        {!loading && categories.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-8 text-xs text-neutral-45">
            <span className="w-8 h-px bg-neutral-45/50" />
            <span className="tracking-[0.2em] uppercase text-[10px]">
              Swipe to explore
            </span>
            <span className="w-8 h-px bg-neutral-45/50" />
          </div>
        )}

        {/* Empty state */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-neutral-45">
              No categories available yet.
            </p>
          </div>
        )}
      </Container>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ShopByCategory;

// <Link
//               key={occasion._id}
//               to={`/products?occasion=${occasion.slug}`}
//               className="group flex-shrink-0 snap-start w-[240px] md:w-[280px] flex flex-col"
//             >
//               {/* Big number + name */}
//               <div className="mb-4">
//                 <span className="text-[60px] md:text-[80px] font-bold text-neutral-10/10 leading-none tracking-tighter font-mono block">
//                   {String(i + 1).padStart(2, "0")}
//                 </span>
//                 <h3 className="text-xl md:text-2xl font-bold text-neutral-10 tracking-tight -mt-6 md:-mt-8 relative z-10 group-hover:text-primary-10 transition-colors">
//                   {occasion.name}
//                 </h3>
//               </div>

//               {/* Image with clean corners */}
//               <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-20">
//                 <img
//                   src={occasion.image}
//                   alt={occasion.name}
//                   loading="lazy"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />

//                 {/* Dark overlay on hover */}
//                 <div className="absolute inset-0 bg-neutral-10/0 group-hover:bg-neutral-10/30 transition-colors duration-500" />

//                 {/* Arrow appears on hover */}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <div className="w-14 h-14 rounded-full bg-white text-neutral-10 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
//                     <FiArrowUpRight size={22} />
//                   </div>
//                 </div>
//               </div>

//               {/* Description below */}
//               <div className="mt-4">
//                 <p className="text-xs text-neutral-45">
//                   {occasion.description}
//                 </p>
//                 <p className="text-[11px] text-neutral-45 mt-1 font-mono tracking-wider">
//                   {occasion.productCount} ITEMS
//                 </p>
//               </div>
//             </Link>
