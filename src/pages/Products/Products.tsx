/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import { FiSliders, FiChevronDown, FiX, FiPackage } from "react-icons/fi";
import Filters from "../../components/ProductsPage/Filters/Filters";
import ProductCard from "../../components/HomePage/BestSeller/ProductCard";
import Container from "../../components/Reusable/Container/Container";
import { useGetAllProductsQuery } from "../../redux/Features/Product/productApi";
import type { TProduct } from "../../types/product.type";
import ProductCardSkeletonLoader from "../../components/SkeletonLoaders/ProductCardSkeletonLoader/ProductCardSkeletonLoader";
import { useSearchParams } from "react-router-dom";

interface SortOption {
  value: string;
  label: string;
}

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ─── Read from URL ───────────────────────────────────
  const queryParam = searchParams.get("query") || "";
  const occasionParam = searchParams.get("occasion") || "";
  const subOccasionParam = searchParams.get("subOccasion") || "";
  const categoryParam = searchParams.get("category") || "";
  const subCategoryParam = searchParams.get("subCategory") || "";
  const materialParam = searchParams.get("material") || "";
  const colorParam = searchParams.get("color") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const sortByParam = searchParams.get("sortBy") || "latest";

  // ─── Local filter states (initialized from URL) ──────
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    occasionParam ? occasionParam.split(",").filter(Boolean) : [],
  );
  const [selectedSubOccasions, setSelectedSubOccasions] = useState<string[]>(
    subOccasionParam ? subOccasionParam.split(",").filter(Boolean) : [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? categoryParam.split(",").filter(Boolean) : [],
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    subCategoryParam ? subCategoryParam.split(",").filter(Boolean) : [],
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    materialParam ? materialParam.split(",").filter(Boolean) : [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorParam ? colorParam.split(",").filter(Boolean) : [],
  );
  const [minPrice, setMinPrice] = useState<string>(minPriceParam);
  const [maxPrice, setMaxPrice] = useState<string>(maxPriceParam);
  const [sortBy, setSortBy] = useState<string>(sortByParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    [],
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // ─── Sync filters → URL ───────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("query", searchQuery);
    if (selectedOccasions.length)
      params.set("occasion", selectedOccasions.join(","));
    if (selectedSubOccasions.length)
      params.set("subOccasion", selectedSubOccasions.join(","));
    if (selectedCategories.length)
      params.set("category", selectedCategories.join(","));
    if (selectedSubCategories.length)
      params.set("subCategory", selectedSubCategories.join(","));
    if (selectedMaterials.length)
      params.set("material", selectedMaterials.join(","));
    if (selectedColors.length)
      params.set("color", selectedColors.join(","));
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sortBy && sortBy !== "latest") params.set("sortBy", sortBy);

    // Only update if the query string actually changed
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchQuery,
    selectedOccasions,
    selectedSubOccasions,
    selectedCategories,
    selectedSubCategories,
    selectedMaterials,
    selectedColors,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // ─── Sync URL → filters (browser back/forward, external links) ──
  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedOccasions(
      occasionParam ? occasionParam.split(",").filter(Boolean) : [],
    );
    setSelectedSubOccasions(
      subOccasionParam ? subOccasionParam.split(",").filter(Boolean) : [],
    );
    setSelectedCategories(
      categoryParam ? categoryParam.split(",").filter(Boolean) : [],
    );
    setSelectedSubCategories(
      subCategoryParam ? subCategoryParam.split(",").filter(Boolean) : [],
    );
    setSelectedMaterials(
      materialParam ? materialParam.split(",").filter(Boolean) : [],
    );
    setSelectedColors(
      colorParam ? colorParam.split(",").filter(Boolean) : [],
    );
    setMinPrice(minPriceParam);
    setMaxPrice(maxPriceParam);
    setSortBy(sortByParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const sortOptions: SortOption[] = [
    { value: "latest", label: "Latest" },
    { value: "price_low_to_high", label: "Price: Low to High" },
    { value: "price_high_to_low", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "top_rated", label: "Top Rated" },
  ];

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    category: selectedCategories,
    subCategory: selectedSubCategories,
    occasionNames: selectedOccasions,
    subOccasionNames: selectedSubOccasions,
    material: selectedMaterials,
    colors: selectedColors,
    keyword: searchQuery,
    minPrice: minPrice as any,
    maxPrice: maxPrice as any,
    sortBy: sortBy as any,
  });
  const products = data?.data?.data || [];

  const getActiveFilterCount = (): number => {
    return (
      selectedOccasions.length +
      selectedAvailability.length +
      selectedMaterials.length +
      selectedColors.length +
      (minPrice ? 1 : 0) +
      (maxPrice ? 1 : 0) +
      selectedCategories.length +
      selectedSubCategories.length +
      selectedSubOccasions.length +
      (searchQuery ? 1 : 0)
    );
  };

  const clearAllFilters = useCallback((): void => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSearchQuery("");
    setSelectedOccasions([]);
    setSelectedSubOccasions([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedAvailability([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSortBy("latest");
    // Sync effect will clear the URL automatically
  }, []);

  return (
    <div className="bg-neutral-20 min-h-screen font-Manrope">
      <Container>
        <div className="py-6 lg:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-10">Products</h1>
              <p className="text-sm text-neutral-45 mt-1">
                Discover our curated collection
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-50 rounded-xl text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-colors"
              >
                <FiSliders size={18} />
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 bg-primary-10 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-50 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-neutral-10 focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent cursor-pointer transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      Sort by: {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-45 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto custom-filter-scrollbar">
                <Filters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedOccasions={selectedOccasions}
                  setSelectedOccasions={setSelectedOccasions}
                  selectedSubOccasions={selectedSubOccasions}
                  setSelectedSubOccasions={setSelectedSubOccasions}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedSubCategories={selectedSubCategories}
                  setSelectedSubCategories={setSelectedSubCategories}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  selectedAvailability={selectedAvailability}
                  setSelectedAvailability={setSelectedAvailability}
                  selectedMaterials={selectedMaterials}
                  setSelectedMaterials={setSelectedMaterials}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  onClearFilters={clearAllFilters}
                  activeFilterCount={getActiveFilterCount()}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {isLoading || isFetching ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeletonLoader key={index} />
                  ))
                ) : products?.length === 0 ? (
                  <div className="col-span-1 sm:col-span-2 xl:col-span-3 flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-neutral-20 flex items-center justify-center mb-4">
                      <FiPackage className="text-neutral-45 text-3xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-10 mb-1">
                      No Products Found
                    </h3>
                    <p className="text-neutral-45 text-sm max-w-sm">
                      Try adjusting your filters or search criteria.
                    </p>
                  </div>
                ) : (
                  products?.map((product: TProduct) => (
                    <ProductCard key={product?._id} product={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-neutral-10">
                  Filters
                </h2>
                {getActiveFilterCount() > 0 && (
                  <p className="text-xs text-neutral-45 mt-0.5">
                    {getActiveFilterCount()} filters active
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-neutral-20 rounded-lg transition-colors"
              >
                <FiX size={20} className="text-neutral-10" />
              </button>
            </div>
            <Filters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedOccasions={selectedOccasions}
              setSelectedOccasions={setSelectedOccasions}
              selectedSubOccasions={selectedSubOccasions}
              setSelectedSubOccasions={setSelectedSubOccasions}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedSubCategories={selectedSubCategories}
              setSelectedSubCategories={setSelectedSubCategories}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={setSelectedAvailability}
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              onClearFilters={clearAllFilters}
              activeFilterCount={getActiveFilterCount()}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb,
        input[type="range"]::-moz-range-thumb {
          width: 0;
          height: 0;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Products;