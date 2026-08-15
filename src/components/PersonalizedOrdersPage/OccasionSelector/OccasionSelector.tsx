import React from "react";
import {
  FiHeart,
  FiStar,
  FiGift,
  FiPackage,
  FiTruck,
  FiClipboard,
} from "react-icons/fi";

interface OccasionSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const OccasionSelector: React.FC<OccasionSelectorProps> = ({
  selected,
  onChange,
}) => {
  const occasions: any[] = [
    {
      id: "wedding",
      label: "Wedding",
      icon: <FiHeart />,
      description: "Perfect for the happy couple",
    },
    {
      id: "anniversary",
      label: "Anniversary",
      icon: <FiStar />,
      description: "Celebrate love and togetherness",
    },
    {
      id: "birthday",
      label: "Birthday",
      icon: <FiGift />,
      description: "Make their day extra special",
    },
    {
      id: "babyshower",
      label: "Baby Shower",
      icon: <FiPackage />,
      description: "Welcome the little one",
    },
    {
      id: "housewarming",
      label: "Housewarming",
      icon: <FiTruck />,
      description: "Bless their new home",
    },
    {
      id: "festival",
      label: "Festival",
      icon: <FiStar />,
      description: "Spread festive joy",
    },
    {
      id: "corporate",
      label: "Corporate Gift",
      icon: <FiPackage />,
      description: "Impress your colleagues",
    },
    {
      id: "custom",
      label: "Custom Occasion",
      icon: <FiClipboard />,
      description: "Tell us what you need",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          type="button"
          onClick={() => onChange(occasion.id)}
          className={`
            p-3 rounded-xl border-2 text-left transition-all
            ${
              selected === occasion.id
                ? "border-primary-10 bg-primary-10/5 shadow-md"
                : "border-neutral-50 hover:border-primary-10 hover:bg-primary-10/5"
            }
          `}
        >
          <div
            className={`text-xl ${selected === occasion.id ? "text-primary-10" : "text-neutral-45"}`}
          >
            {occasion.icon}
          </div>
          <div className="text-sm font-medium text-neutral-10 mt-1">
            {occasion.label}
          </div>
          <div className="text-xs text-neutral-45 hidden sm:block">
            {occasion.description}
          </div>
        </button>
      ))}
    </div>
  );
};

export default OccasionSelector;
