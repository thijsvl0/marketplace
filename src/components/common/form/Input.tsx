import type { ComponentType, InputHTMLAttributes } from "react";

import type { IconBaseProps } from "react-icons";
import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: ComponentType<IconBaseProps>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={twMerge(
            "w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm",
            Icon && "pr-12",
            className
          )}
          {...props}
        />
        {Icon && (
          <div className="absolute inset-y-0 right-4 inline-flex items-center">
            <Icon size={"1.25rem"} />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
