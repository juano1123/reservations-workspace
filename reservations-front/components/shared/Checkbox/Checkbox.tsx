import { cva } from "class-variance-authority";
import { ComponentType } from "react";

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  value?: boolean;
  className?: string;
  labelClass?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const checkbox = cva([
  "h-4",
  "w-4",
  "appearance-none",
  "rounded-sm",
  "border",
  "border-gray-300",
  "border-solid",
  "cursor-pointer",
  "focus:outline-none",
  "focus:ring",
  "focus:ring-blue-200",
  "focus:border-blue-500",
  "checked:border-1",
  "checked:border-blue-500",
  "checked:bg-blue-500",
  "disabled:bg-gray-400",
  "disabled:border-gray-400",
  "disabled:cursor-not-allowed",
  "peer",
]);

const CheckIconComponent: ComponentType = () => (
  <svg
    className="absolute w-4 h-4 hidden peer-checked:block pointer-events-none"
    width="24"
    height="24"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.625 3.37524L5.375 8.62501L2.75 6.00024"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const labelStyle = cva(["w-full", "ml-2", "text-sm"]);

export const Checkbox = ({
  label = "",
  value = false,
  className = "",
  labelClass = "",
  disabled = false,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <div className={`flex items-center relative ${className}`}>
      <input
        type="checkbox"
        className={checkbox({ class: className })}
        {...props}
        checked={value}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckIconComponent />
      {label && (
        <label className={labelStyle({ class: `${labelClass}` })}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
