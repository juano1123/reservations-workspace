import { cva } from "class-variance-authority";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  typeButton?: "primary" | "success" | "danger" | "warning" | "disabled";
  className?: string;
}

const button = cva(["px-4", "py-2", "rounded"], {
  variants: {
    typeButton: {
      primary: ["bg-pink-100", "text-white"],
      success: ["bg-green-500", "text-white"],
      danger: ["bg-red-500", "text-white"],
      warning: ["bg-yellow-500", "text-white"],
      disabled: ["bg-gray-500", "text-white"],
    },
    defaultVariants: {
      typeButton: "primary",
    },
  },
});

export const Button = ({
  children,
  typeButton = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={button({ typeButton, class: className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
