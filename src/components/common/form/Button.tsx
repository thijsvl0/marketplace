import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";

import clsx from "clsx";

const variants = {
  primary: "bg-teal-600 text-white hover:bg-teal-700",
  secondary: "bg-gray-100 text-teal-600 hover:text-teal-600/75",
};

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof typeof variants;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "block rounded-md px-5 py-2.5 text-sm font-medium transition",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
