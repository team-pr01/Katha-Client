import { ICONS } from "../../../assets";

const Button = ({
  type = "button",
  variant = "primary",
  label,
  onClick,
  className = "",
  isLoading = false,
  isDisabled = false,
  icon = true,
}: {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary" | "outlinePrimary";
  label: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: boolean;
}) => {
  const showIcon = !isLoading && icon;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`text-xs md:text-sm rounded-[30px] py-2 font-Manrope font-medium flex items-center justify-center gap-3 w-fit border h-fit transition-all duration-300 active:scale-95 group shadow-sm ${
        showIcon ? "pr-2 pl-6 md:pl-8" : "px-6 md:px-8"
      } ${
        isLoading ? "opacity-85 cursor-not-allowed" : "cursor-pointer"
      } ${
        variant === "primary"
          ? "border-primary-10 gradient-primary-button text-white"
          : variant === "secondary"
            ? "bg-white border-white text-neutral-10"
            : variant === "outlinePrimary"
              ? "border-primary-10 bg-transparent text-neutral-65"
              : "border-white bg-none text-white"
      } ${className}`}
    >
      {/* Loading spinner */}
      {isLoading && (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Label */}
      <span className="transition-all duration-300">
        {isLoading ? "Please wait..." : label}
      </span>

      {/* Right Side Arrow Icon Circle */}
      {showIcon && (
        <div
          className={`size-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
            variant === "primary" ? "bg-white" : "bg-primary-10"
          } group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
        >
          <img
            src={
              variant === "primary"
                ? ICONS.arrowRight
                : ICONS.arrowRightWhite
            }
            alt="arrow"
            className="size-5"
          />
        </div>
      )}
    </button>
  );
};

export default Button;