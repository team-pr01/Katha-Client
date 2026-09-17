import { FiSearch } from "react-icons/fi";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchField = ({
  value,
  onChange,
  placeholder = "Search…",
}: SearchFieldProps) => {
  return (
    <div className="relative flex-1 min-w-0">
      <FiSearch
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-45"
        size={16}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2.5 rounded-xl 
          bg-neutral-20/60 border border-transparent
          text-sm text-neutral-10 placeholder:text-neutral-45
          focus:outline-none focus:bg-white focus:border-primary-10/40
          transition-all
        "
      />
    </div>
  );
};

export default SearchField;
