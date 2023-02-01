import type { FC, LabelHTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label
      className={clsx(
        "mb-2 block text-sm font-medium text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};
export default Label;
