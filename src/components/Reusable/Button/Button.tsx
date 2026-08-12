  import { ICONS } from "../../../assets";

const Button = ({
  type = "button",
  variant = "primary",
  label,
  onClick,
  className = "",
  isLoading = false,
  icon=true,
}: {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary" | "outlinePrimary";
  label: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  icon?: boolean;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`text-xs md:text-sm rounded-[30px] py-1.5 lg:py-2 pr-2 pl-6 md:pl-8 font-Manrope font-medium flex items-center justify-center gap-3 w-fit border h-fit transition-all duration-300 active:scale-95 group shadow-sm ${
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
      {/* Container for Spinner and Text */}
      <div className="flex items-center">
        {isLoading && (
          <div className="mr-2 flex items-center justify-center transition-all duration-500 animate-in fade-in zoom-in slide-in-from-left-2 py-1.5">
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
              ></circle>
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        <span className="transition-all duration-300">
          {isLoading ? "Please wait..." : label}
        </span>
      </div>

      {/* Right Side Arrow Icon Circle */}
      {
        !isLoading && icon &&
        <div
        className={`size-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
          variant === "primary" ? "bg-white" : "bg-primary-10"
        } ${isLoading ? "scale-90 opacity-50" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
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
      }
    </button>
  );
};

export default Button;