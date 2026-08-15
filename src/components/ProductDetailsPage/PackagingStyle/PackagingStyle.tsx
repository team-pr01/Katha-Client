import React, { useState } from "react";
import { FiGift } from "react-icons/fi";
import { IMAGES } from "../../../assets";

interface PackagingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
}

const PackagingStyle: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>("regular");

  const packagingOptions: PackagingOption[] = [
    {
      id: "regular",
      name: "Regular Packaging",
      description: "Basic packaging for safe delivery",
      price: 0,
      image: IMAGES.regularPackaging || "/api/placeholder/400/200",
    },
    {
      id: "ribbon",
      name: "Ribbon",
      description: "Elegant ribbon wrapping, perfect for gifting.",
      price: 160,
      image: IMAGES.ribbonPackaging || "/api/placeholder/400/200",
      isPopular: true,
    },
    {
      id: "flowers",
      name: "Decorative Flowers",
      description: "Beautiful floral accents for a festive presentation.",
      price: 160,
      image: IMAGES.decorativeFlowersPackaging || "/api/placeholder/400/200",
    },
    {
      id: "platter",
      name: "1 Ring Platter",
      description:
        "Premium brass platter presentation for a traditional gifting experience.",
      price: 160,
      image: IMAGES.ringPlatterPackaging || "/api/placeholder/400/200",
    },
  ];

  const selectedOption = packagingOptions.find(
    (opt) => opt.id === selectedPackage,
  );

  const handleSelect = (id: string): void => {
    setSelectedPackage(id);
  };

  const getPriceDisplay = (price: number): string => {
    if (price === 0) return "Included";
    return `₹${price}`;
  };

  return (
    <div className="border-t border-[#d4d4d4] pt-4 mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-10">
            Packaging Style
          </h3>
          <p className="text-sm text-neutral-45 mt-1 max-w-70">
            Choose your preferred packaging style for a special touch
          </p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-20 px-3 py-1.5 rounded-lg">
          <FiGift className="text-primary-10" size={16} />
          <span className="text-sm font-medium text-neutral-10">
            {selectedOption?.name || "Regular"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packagingOptions.map((option) => {
          const isSelected = selectedPackage === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                relative group rounded-xl overflow-hidden border-2 transition-all duration-300 text-left h-fit
                ${
                  isSelected
                    ? "border-primary-10 shadow-lg"
                    : "border-neutral-50 hover:border-primary-10 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-start gap-4 p-4">
                {/* Image */}
                <div className="relative size-20 shrink-0 rounded-lg overflow-hidden bg-neutral-20">
                  <img
                    src={option.image}
                    alt={option.name}
                    className={`
                      w-full h-full object-cover transition-transform duration-500
                      ${isSelected ? "scale-105" : "group-hover:scale-105"}
                    `}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary-10/10" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <h4
                    className={`
                    font-bold text-[13px] transition-colors
                    ${isSelected ? "text-primary-10" : "text-neutral-10 group-hover:text-primary-10"}
                  `}
                  >
                    {option.name}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-neutral-45] mt-1 line-clamp-2">
                    {option.description}
                  </p>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-50">
                    <div>
                      <span
                        className={`
                        text-sm font-semibold
                        ${option.price === 0 ? "text-green-600" : "text-neutral-10"}
                      `}
                      >
                        {getPriceDisplay(option.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PackagingStyle;
