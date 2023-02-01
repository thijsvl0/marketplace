import type { InputHTMLAttributes, ReactNode } from "react";

import React from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={clsx(
            "w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm shadow-sm",
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-4 inline-flex items-center">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
