import type { AnchorHTMLAttributes, ReactNode } from "react";

import React from "react";
import clsx from "clsx";

type Color = "primary" | "secondary";

const colors: Record<Color, string> = {
  primary: "text-gray-900 hover:text-gray-900/75",
  secondary: "text-gray-700 hover:text-gray-700/75",
};

interface AProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color?: Color;
}

const A = React.forwardRef<HTMLAnchorElement, AProps>(
  ({ children, color = "primary", className, ...props }, ref) => {
    return (
      <a
        className={clsx("transition", colors[color], className)}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    );
  }
);

A.displayName = "A";

export default A;
