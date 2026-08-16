import React, { useState } from "react";
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

// Types
interface FilterOption {
  label: string;
  count: number;
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
  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  selectedAvailability: string[];
  setSelectedAvailability: React.Dispatch<React.SetStateAction<string[]>>;
  selectedMaterials: string[];
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

// Price Range Component
const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const minVal: number = parseInt(minPrice) || 0;
  const maxVal: number = parseInt(maxPrice) || 5000;
  const totalRange: number = 5000;

  const minPercent: number = (minVal / totalRange) * 100;
  const maxPercent: number = (maxVal / totalRange) * 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const maxValNum = parseInt(maxPrice) || 5000;
    if (val <= maxValNum) {
      onMinChange(val.toString());
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const minValNum = parseInt(minPrice) || 0;
    if (val >= minValNum) {
      onMaxChange(val.toString());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-neutral-45 block mb-1">Min</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-45 text-sm">
              $
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
              $
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

      {/* Custom Range Slider */}
      <div className="relative pt-2">
        <div className="relative h-1.5 bg-neutral-50 rounded-full">
          {/* Selected range */}
          <div
            className="absolute h-full bg-primary-10 rounded-full"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />
        </div>
        <div className="relative">
          {/* Min thumb */}
          <input
            type="range"
            min="0"
            max="5000"
            value={minPrice || 0}
            onChange={handleMinChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="absolute top-0 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
            style={{
              zIndex: 3,
            }}
          />
          {/* Max thumb */}
          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice || 5000}
            onChange={handleMaxChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="absolute top-0 -translate-y-1/2 w-full h-1.5 appearance-none bg-transparent pointer-events-none"
            style={{
              zIndex: 3,
            }}
          />
          {/* Custom thumbs */}
          <div
            className={`absolute top-0 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white shadow-md transition-transform ${
              isDragging ? "scale-110" : ""
            }`}
            style={{
              left: `${minPercent}%`,
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.1 : 1})`,
              borderColor: "#eb9e3a",
              zIndex: 4,
            }}
          />
          <div
            className={`absolute top-0 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white shadow-md transition-transform ${
              isDragging ? "scale-110" : ""
            }`}
            style={{
              left: `${maxPercent}%`,
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.1 : 1})`,
              borderColor: "#eb9e3a",
              zIndex: 4,
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-neutral-45">$0</span>
          <span className="text-xs text-neutral-45">$5,000+</span>
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
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedAvailability,
  setSelectedAvailability,
  selectedMaterials,
  setSelectedMaterials,
  selectedColors,
  setSelectedColors,
  onClearFilters,
  activeFilterCount,
}) => {
  // Mock data - Replace with actual data from API
  const occasions: FilterOption[] = [
    { label: "Wedding", count: 136 },
    { label: "Anniversary", count: 89 },
    { label: "Birthday Party", count: 250 },
    { label: "Corporate Event", count: 95 },
    { label: "Baby Shower", count: 180 },
    { label: "Farewell", count: 67 },
    { label: "Festival", count: 145 },
    { label: "Housewarming", count: 112 },
  ];

  const availabilityOptions: FilterOption[] = [
    { label: "In Stock", count: 136 },
    { label: "Out of Stock", count: 136 },
    { label: "Undeliverable on Pin", count: 180 },
  ];

  const materials: FilterOption[] = [
    { label: "Wood", count: 136 },
    { label: "Leather", count: 136 },
    { label: "Brass", count: 250 },
    { label: "Cotton", count: 95 },
    { label: "Steel", count: 180 },
    { label: "Jute", count: 180 },
    { label: "Bamboo", count: 180 },
    { label: "Silver", count: 180 },
  ];

  const colors: FilterOption[] = [
    { label: "Red", count: 136 },
    { label: "Blue", count: 136 },
    { label: "Green", count: 136 },
    { label: "Yellow", count: 136 },
    { label: "Purple", count: 85 },
    { label: "Orange", count: 100 },
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

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 font-Manrope">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-10">Filters</h2>
        {activeFilterCount > 0 && (
          <span className="text-xs bg-primary-10 text-white px-2 py-0.5 rounded-full">
            {activeFilterCount} active
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
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

      <FilterSection title="Occasion">
        {occasions.slice(0, 7).map((item: FilterOption) => (
          <FilterCheckbox
            key={item.label}
            label={item.label}
            count={item.count}
            checked={selectedOccasions.includes(item.label)}
            onChange={() =>
              handleCheckboxChange(
                selectedOccasions,
                setSelectedOccasions,
                item.label,
              )
            }
          />
        ))}
        {occasions.length > 7 && (
          <button className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors">
            +{occasions.length - 7} more
          </button>
        )}
      </FilterSection>

      <FilterSection title="Price">
        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
        />
      </FilterSection>

      <FilterSection title="Availability">
        {availabilityOptions.map((item: FilterOption) => (
          <FilterCheckbox
            key={item.label}
            label={item.label}
            count={item.count}
            checked={selectedAvailability.includes(item.label)}
            onChange={() =>
              handleCheckboxChange(
                selectedAvailability,
                setSelectedAvailability,
                item.label,
              )
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Material">
        {materials.slice(0, 7).map((item: FilterOption) => (
          <FilterCheckbox
            key={item.label}
            label={item.label}
            count={item.count}
            checked={selectedMaterials.includes(item.label)}
            onChange={() =>
              handleCheckboxChange(
                selectedMaterials,
                setSelectedMaterials,
                item.label,
              )
            }
          />
        ))}
        {materials.length > 7 && (
          <button className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors">
            +{materials.length - 7} more
          </button>
        )}
      </FilterSection>

      <FilterSection title="Color">
        {colors.slice(0, 6).map((item: FilterOption) => (
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
        {colors.length > 6 && (
          <button className="text-sm text-primary-10 hover:text-[#d4892a] font-medium mt-1 transition-colors">
            +{colors.length - 6} more
          </button>
        )}
      </FilterSection>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={onClearFilters}
          className="mt-6 text-sm text-primary-10 hover:text-[#d4892a] font-medium flex items-center gap-1.5 transition-colors"
        >
          <FiX size={16} />
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );
};

export default Filters;
