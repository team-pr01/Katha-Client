import React from "react";

interface BudgetSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  selected,
  onChange,
}) => {
  const budgetRanges = [
    "Under ₹500",
    "₹500 - ₹1,000",
    "₹1,000 - ₹2,000",
    "₹2,000 - ₹5,000",
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "Above ₹50,000",
    "No budget limit",
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {budgetRanges.map((budget) => (
        <button
          key={budget}
          type="button"
          onClick={() => onChange(budget)}
          className={`
            px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
            ${
              selected === budget
                ? "border-primary-10 bg-primary-10/10 text-primary-10"
                : "border-neutral-50 text-neutral-45 hover:border-primary-10 hover:text-primary-10"
            }
          `}
        >
          {budget}
        </button>
      ))}
    </div>
  );
};

export default BudgetSelector;
