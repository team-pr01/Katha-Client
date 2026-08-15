import React, { useState } from "react";
import { FiSliders, FiChevronDown, FiX } from "react-icons/fi";
import Filters from "../../components/ProductsPage/Filters/Filters";
import ProductCard from "../../components/HomePage/BestSeller/ProductCard";
import Container from "../../components/Reusable/Container/Container";

// Types
interface SortOption {
  value: string;
  label: string;
}

const Products: React.FC = () => {
  // Filter states
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    [],
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sortOptions: SortOption[] = [
    { value: "latest", label: "Latest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Top Rated" },
  ];

  const getActiveFilterCount = (): number => {
    return (
      selectedOccasions.length +
      selectedAvailability.length +
      selectedMaterials.length +
      selectedColors.length +
      (minPrice ? 1 : 0) +
      (maxPrice ? 1 : 0)
    );
  };

  const clearAllFilters = (): void => {
    setSelectedOccasions([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedAvailability([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
  };

  return (
    <div className="bg-neutral-20 min-h-screen font-Manrope">
      <Container>
        <div className="py-6 lg:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-10">
                Products
              </h1>
              <p className="text-sm text-neutral-45 mt-1">
                Discover our curated collection
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
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

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSortBy(e.target.value)
                  }
                  className="appearance-none bg-white border border-neutral-50 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-neutral-10 focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent cursor-pointer transition-all"
                >
                  {sortOptions.map((option: SortOption) => (
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
              <div className="sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
                <Filters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedOccasions={selectedOccasions}
                  setSelectedOccasions={setSelectedOccasions}
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
              {/* Results count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-neutral-45">
                  Showing 1-12 of 1,245 results
                </p>
                <p className="text-sm text-neutral-45 hidden sm:block">
                  Page 1 of 104
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {[1, 2, 3, 4, 5, 6].map((item: number) => (
                  <ProductCard key={item} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-50">
                <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-neutral-10 bg-white border border-neutral-50 rounded-lg hover:bg-neutral-20 transition-colors">
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-10 text-white text-sm font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-sm font-medium text-neutral-10 transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-sm font-medium text-neutral-10 transition-colors">
                    3
                  </button>
                  <span className="text-neutral-45">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-sm font-medium text-neutral-10 transition-colors">
                    12
                  </button>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-neutral-10 bg-white border border-neutral-50 rounded-lg hover:bg-neutral-20 transition-colors">
                  Next
                </button>
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
                <h2 className="text-lg font-semibold text-neutral-10">Filters</h2>
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
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        /* Range input styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
        }
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
