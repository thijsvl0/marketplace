import type { ButtonHTMLAttributes, ComponentType, FC, ReactNode } from "react";

import type { IconBaseProps } from "react-icons";
import React from "react";
import { twMerge } from "tailwind-merge";

type Color = "primary" | "danger";
type Variant = "outline" | "solid" | "transparant";

const sizes = {
  md: "py-2 px-4 rounded-md",
  square: "p-2 rounded-md",
  round: "p-2 rounded-full",
};

const variants: Record<Variant, Record<Color, string>> = {
  solid: {
    primary:
      "bg-teal-600 text-white enabled:hover:bg-teal-700 disabled:bg-gray-400",
    danger:
      "bg-red-400 text-white enabled:hover:bg-red-500 disabled:bg-gray-400",
  },
  outline: {
    primary:
      "bg-transparent border border-teal-700/25 text-teal-600 enabled:hover:bg-teal-50",
    danger:
      "bg-transparent border border-red-500/25 text-red-500 enabled:hover:bg-red-50",
  },
  transparant: {
    primary: "bg-transparent text-teal-600 enabled:hover:bg-teal-50",
    danger: "bg-transparent text-red-500 enabled:hover:bg-red-50",
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: keyof typeof sizes;
  children?: ReactNode;
  Icon?: ComponentType<IconBaseProps>;
}

const Button: FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = "solid",
      color = "primary",
      size = "md",
      children,
      className,
      Icon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          "flex items-center justify-start gap-x-2 font-medium transition sm:text-sm",
          sizes[size],
          variants[variant][color],
          className
        )}
        ref={ref}
        {...props}
      >
        {Icon && <Icon size={"1.25rem"} />}
        {children}
      </button>
    );
  }
);
Button.displayName = "button";

export default Button;
