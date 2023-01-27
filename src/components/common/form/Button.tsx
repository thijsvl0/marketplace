import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";

import React from "react";
import clsx from "clsx";

const variants = {
  primary: "bg-teal-600 text-white hover:bg-teal-700",
  secondary: "bg-gray-100 text-teal-600 hover:text-teal-600/75",
  secondaryTransparent: "bg-transparent text-teal-700 hover:bg-gray-100",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  children: ReactNode;
  square?: boolean;
}

const Button: FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    { variant = "primary", children, className, square = false, ...props },
    ref
  ) => {
    return (
      <button
        className={clsx(
          "block rounded-md py-2.5 text-sm font-medium transition",
          square ? "px-2.5" : "px-5",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
export default Button;
