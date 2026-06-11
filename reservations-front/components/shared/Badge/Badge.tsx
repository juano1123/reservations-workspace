import { cva } from "class-variance-authority";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  typeBadge?: "primary" | "success" | "danger" | "warning" | "disabled";
}

const badge = cva(["px-4", "py-2", "rounded", "w-fit", "border"], {
  variants: {
    typeBadge: {
      primary: ["bg-blue-50", "text-blue-700", "border-blue-200"],
      success: ["bg-green-50", "text-green-700", "border-green-200"],
      danger: ["bg-red-50", "text-red-700", "border-red-200"],
      warning: ["bg-yellow-50", "text-yellow-700", "border-yellow-200"],
      disabled: ["bg-gray-50", "text-gray-700", "border-gray-200"],
    },
    defaultVariants: {
      typeBadge: "primary",
    },
  },
});

export const Badge = ({
  children,
  typeBadge = "primary",
  ...props
}: BadgeProps) => {
  return (
    <span className={badge({ typeBadge })} {...props}>
      {children}
    </span>
  );
};

export default Badge;
