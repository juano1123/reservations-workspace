import { cva } from "class-variance-authority";
import Icon from "../Icon";

interface AlertProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  action?: () => void;
  typeAlert?: "primary" | "success" | "danger" | "warning" | "disabled";
}

const alert = cva(
  [
    "px-4",
    "py-2",
    "rounded",
    "min-w-[240px]",
    "w-fit",
    "flex",
    "items-center",
    "justify-between",
    "text-sm",
    "border",
    "gap-2",
  ],
  {
    variants: {
      typeAlert: {
        primary: ["bg-blue-50", "text-blue-700", "border-blue-200"],
        success: ["bg-green-50", "text-green-700", "border-green-200"],
        danger: ["bg-red-50", "text-red-700", "border-red-200"],
        warning: ["bg-yellow-50", "text-yellow-700", "border-yellow-200"],
        disabled: ["bg-gray-50", "text-gray-700", "border-gray-200"],
      },
      defaultVariants: {
        typeAlert: "primary",
      },
    },
  }
);

export const Alert = ({
  children,
  typeAlert = "primary",
  action,
  ...props
}: AlertProps) => {
  return (
    <div {...props} className={alert({ typeAlert })}>
      {children}
      {action && (
        <span onClick={action} className="cursor-pointer">
          <Icon name="X" />
        </span>
      )}
    </div>
  );
};

export default Alert;
