import type { TFilterOption } from "../../../types/dataFilters.types";

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: TFilterOption[];
  ariaLabel?: string;
}

const SelectField = ({
  value,
  onChange,
  options,
  ariaLabel,
}: SelectFieldProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="
        px-3.5 py-2.5 rounded-xl 
        bg-neutral-20/60 border border-transparent
        text-sm text-neutral-10
        focus:outline-none focus:bg-white focus:border-primary-10/40
        transition-all cursor-pointer
      "
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
