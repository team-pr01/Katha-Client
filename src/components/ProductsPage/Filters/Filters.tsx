import React, { useState } from "react";
import {
  FiSearch,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { useGetAllOccasionsQuery } from "../../../redux/Features/Occation/occasionApi";
import { useGetAllCategoriesQuery } from "../../../redux/Features/Category/categoryApi";
import FiltersSkeletonLoader from "../../SkeletonLoaders/FiltersSkeletonLoader/FiltersSkeletonLoader";
import { useGetAllMaterialsQuery } from "../../../redux/Features/Material/materialApi";

// Types
interface FilterOption {
  label: string;
  count: number;
  id?: string; // Add optional id for materials
}

interface SubItem {
  name: string;
  productCount: number;
}

interface OccasionFilterOption {
  name: string;
  productCount: number;
  subOccasions?: SubItem[];
}

interface CategoryFilterOption {
  name: string;
  productCount: number;
  subCategories?: SubItem[];
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

interface FilterCheckboxProps {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
  id?: string; // Add optional id
}

interface PriceRangeProps {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedOccasions: string[];
  setSelectedOccasions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSubOccasions: string[];
  setSelectedSubOccasions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSubCategories: string[];
  setSelectedSubCategories: React.Dispatch<React.SetStateAction<string[]>>;
  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  selectedAvailability: string[];
  setSelectedAvailability: React.Dispatch<React.SetStateAction<string[]>>;
  selectedMaterials: string[]; // This will store material IDs
  setSelectedMaterials: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  onClearFilters: () => void;
  activeFilterCount: number;
}

// Filter Section Component
const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  isOpen = true,
}) => {
  const [expanded, setExpanded] = useState<boolean>(isOpen);

  return (
    <div className="border-b border-neutral-50 py-4 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h3 className="text-sm font-semibold text-neutral-10 uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-neutral-45 group-hover:text-primary-10 transition-colors">
          {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </span>
      </button>
      {expanded && <div className="mt-3 space-y-2.5">{children}</div>}
    </div>
  );
};

// Filter Checkbox Component
const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  count,
  checked,
  onChange,
}) => (
  <label className="flex items-center group cursor-pointer">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? "bg-primary-10 border-primary-10"
            : "bg-white border-[#b0b0b0] group-hover:border-primary-10"
        }`}
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
    <span
      className={`ml-2.5 text-sm transition-colors ${
        checked
          ? "text-primary-10 font-medium"
          : "text-neutral-10 group-hover:text-primary-10"
      }`}
    >
      {label}
    </span>
    <span
      className={`ml-auto text-xs transition-colors ${
        checked ? "text-primary-10" : "text-neutral-45"
      }`}
    >
      ({count})
    </span>
  </label>
);

// Generic Item with Sub-Items Component
interface FilterItemWithSubProps {
  item: {
    name: string;
    productCount: number;
    subItems?: SubItem[];
  };
  selectedParents: string[];
  selectedChildren: string[];
  onParentChange: (name: string) => void;
  onChildChange: (name: string) => void;
  childKey: string;
}

const FilterItemWithSub: React.FC<FilterItemWithSubProps> = ({
  item,
  selectedParents,
  selectedChildren,
  onParentChange,
  onChildChange,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleParentToggle = () => {
    onParentChange(item.name);
  };

  return (
    <div className="space-y-1.5">
      {/* Main Parent Checkbox */}
      <div className="flex items-center justify-between group">
        <FilterCheckbox
          label={item.name}
          count={item.productCount}
          checked={selectedParents.includes(item.name)}
          onChange={handleParentToggle}
        />

        {/* Expand/Collapse Button for Sub-Items */}
        {hasSubItems && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 p-0.5 text-neutral-45 hover:text-primary-10 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <FiMinus size={14} /> : <FiPlus size={14} />}
          </button>
        )}
      </div>

      {/* Sub-Items */}
      {hasSubItems && isExpanded && (
        <div className="ml-6 pl-3 border-l-2 border-neutral-50 space-y-1.5">
          {item.subItems!.map((sub) => (
            <FilterCheckbox
              key={sub.name}
              label={sub.name}
              count={sub.productCount}
              checked={selectedChildren.includes(sub.name)}
              onChange={() => onChildChange(sub.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Price Range Component
const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-neutral-45 block mb-1">Min</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-45 text-sm">
              ₹
            </span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => onMinChange(e.target.value)}
              className="w-full pl-7 pr-3 py-2 border border-neutral-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent bg-white"
              placeholder="0"
              min="0"
              max="5000"
            />
          </div>
        </div>
        <span className="text-neutral-45 text-sm mt-3">—</span>
        <div className="flex-1">
          <label className="text-xs text-neutral-45 block mb-1">Max</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-45 text-sm">
              ₹
            </span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => onMaxChange(e.target.value)}
              className="w-full pl-7 pr-3 py-2 border border-neutral-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent bg-white"
              placeholder="5000+"
              min="0"
              max="5000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Filters Component
const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedOccasions,
  setSelectedOccasions,
  selectedSubOccasions,
  setSelectedSubOccasions,
  selectedCategories,
  setSelectedCategories,
  selectedSubCategories,
  setSelectedSubCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedMaterials,
  setSelectedMaterials,
  selectedColors,
  setSelectedColors,
  onClearFilters,
  activeFilterCount,
}) => {
  const [showAllOccasions, setShowAllOccasions] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const { data: occasionData, isLoading: isOccasionsLoading } =
    useGetAllOccasionsQuery({});
  const { data: categoryData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});
  const { data: materialsData, isLoading: isMaterialsLoading } =
    useGetAllMaterialsQuery({});

  const occasions = occasionData?.data?.data || [];
  const categories = categoryData?.data?.data || [];

  // Materials with id
  const materials = materialsData?.data?.data?.map((material: any) => ({
    id: material._id,
    label: material.name,
    count: material.productCount || 0,
  })) || [];

  const colors: FilterOption[] = [
    { label: "Red", count: 136 },
    { label: "Blue", count: 136 },
    { label: "Green", count: 136 },
    { label: "Brown", count: 11 },
    { label: "Yellow", count: 136 },
    { label: "Purple", count: 85 },
    { label: "Orange", count: 100 },
    { label: "Teal", count: 50 },
    { label: "White", count: 90 },
  ];

  const handleCheckboxChange = (
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ): void => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i: string) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleOccasionChange = (name: string): void => {
    handleCheckboxChange(selectedOccasions, setSelectedOccasions, name);
  };

  const handleSubOccasionChange = (name: string): void => {
    handleCheckboxChange(selectedSubOccasions, setSelectedSubOccasions, name);
  };

  const handleCategoryChange = (name: string): void => {
    handleCheckboxChange(selectedCategories, setSelectedCategories, name);
  };

  const handleSubCategoryChange = (name: string): void => {
    handleCheckboxChange(selectedSubCategories, setSelectedSubCategories, name);
  };

  // Handle material change using id
  const handleMaterialChange = (id: string): void => {
    handleCheckboxChange(selectedMaterials, setSelectedMaterials, id);
  };

  // Get total active filter count including sub-occasions and sub-categories
  const totalActiveFilters =
    activeFilterCount +
    selectedSubOccasions.length +
    selectedSubCategories.length;

  const handleClearAll = () => {
    onClearFilters();
    setSelectedSubOccasions([]);
    setSelectedSubCategories([]);
    setSelectedMaterials([]);
  };

  // Show skeleton while loading
  if (isOccasionsLoading || isCategoriesLoading || isMaterialsLoading) {
    return <FiltersSkeletonLoader />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 font-Manrope">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-10">Filters</h2>
        {/* Clear Filters */}
      {totalActiveFilters > 0 && (
        <button
          onClick={handleClearAll}
          className="text-sm text-primary-10 hover:text-[#d4892a] font-medium flex items-center gap-1.5 transition-colors"
        >
          <FiX size={16} />
          Clear Filters ({totalActiveFilters})
        </button>
      )}
      </div>

      {/* Search */}
      <div className="relative mb-2">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-45"
          size={18}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          className="w-full pl-10 pr-4 py-2.5 border border-neutral-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 focus:border-transparent bg-white transition-all"
        />
      </div>

      {/* Occasion Filter */}
      <FilterSection title="Occasion">
        <div className="space-y-2">
          {occasions
            ?.slice(0, showAllOccasions ? occasions.length : 7)
            .map((item: OccasionFilterOption) => (
              <FilterItemWithSub
                key={item.name}
                item={{
                  name: item.name,
                  productCount: item.productCount,
                  subItems: item.subOccasions,
                }}
                selectedParents={selectedOccasions}
                selectedChildren={selectedSubOccasions}
                onParentChange={handleOccasionChange}
                onChildChange={handleSubOccasionChange}
                childKey="subOccasions"
              />
            ))}
          {occasions.length > 7 && (
            <button
              type="button"
              onClick={() => setShowAllOccasions((prev) => !prev)}
              className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors"
            >
              {showAllOccasions ? "Show less" : `+${occasions.length - 7} more`}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Category Filter */}
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories
            ?.slice(0, showAllCategories ? categories.length : 7)
            .map((item: CategoryFilterOption) => (
              <FilterItemWithSub
                key={item.name}
                item={{
                  name: item.name,
                  productCount: item.productCount,
                  subItems: item.subCategories,
                }}
                selectedParents={selectedCategories}
                selectedChildren={selectedSubCategories}
                onParentChange={handleCategoryChange}
                onChildChange={handleSubCategoryChange}
                childKey="subCategories"
              />
            ))}
          {categories.length > 7 && (
            <button
              type="button"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors"
            >
              {showAllCategories
                ? "Show less"
                : `+${categories.length - 7} more`}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price">
        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
        />
      </FilterSection>

      {/* Material Filter - Using ID */}
      <FilterSection title="Material">
        {materials
          .slice(0, showAllMaterials ? materials.length : 7)
          .map((item: any) => (
            <FilterCheckbox
              key={item.id}
              label={item.label}
              count={item.count}
              checked={selectedMaterials.includes(item.id)}
              onChange={() => handleMaterialChange(item.id)}
            />
          ))}
        {materials.length > 7 && (
          <button
            type="button"
            onClick={() => setShowAllMaterials((prev) => !prev)}
            className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors"
          >
            {showAllMaterials ? "Show less" : `+${materials.length - 7} more`}
          </button>
        )}
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Color">
        {colors
          .slice(0, showAllColors ? colors.length : 7)
          .map((item: FilterOption) => (
            <FilterCheckbox
              key={item.label}
              label={item.label}
              count={item.count}
              checked={selectedColors.includes(item.label)}
              onChange={() =>
                handleCheckboxChange(
                  selectedColors,
                  setSelectedColors,
                  item.label,
                )
              }
            />
          ))}
        {colors.length > 7 && (
          <button
            type="button"
            onClick={() => setShowAllColors((prev) => !prev)}
            className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors"
          >
            {showAllColors ? "Show less" : `+${colors.length - 7} more`}
          </button>
        )}
      </FilterSection>

      
    </div>
  );
};

export default Filters;