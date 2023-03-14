import type { FC, LabelHTMLAttributes, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label
      className={twMerge("mb-2 block font-medium text-gray-900", className)}
      {...props}
    >
      {children}
    </label>
  );
};
export default Label;
