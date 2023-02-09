import type { AnchorHTMLAttributes, FC, ReactNode } from "react";

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

const A: FC<AProps> = ({
  children,
  color = "primary",
  className,
  ...props
}) => {
  return (
    <a className={clsx("transition", colors[color], className)} {...props}>
      {children}
    </a>
  );
};
export default A;
