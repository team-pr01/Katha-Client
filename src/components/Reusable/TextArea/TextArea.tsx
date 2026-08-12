/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      name,
      placeholder = "",
      rows = 4,
      error,
      isRequired = true,
      isDisabled = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 font-Nunito w-full">
        <label className="flex flex-row items-center w-full justify-between text-white">
          <span className="leading-4.5 text-[13px] md:text-[15px] font-medium tracking-[-0.16] ">
            {label}{" "}
            <span className="text-primary-10">{isRequired ? "*" : ""}</span>
          </span>
        </label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          disabled={isDisabled}
          required={isRequired}
          className={`w-full px-4 py-3.5 rounded-lg  border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 ${
            isDisabled ? "cursor-not-allowed bg-white/80" : "bg-white"
          } ${error ? "border-red-500" : "border-white"}`}
          {...rest}
        ></textarea>
        {error && (
          <span className="text-red-500 text-sm">{String(error.message)}</span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
