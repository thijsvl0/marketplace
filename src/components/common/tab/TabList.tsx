import type { FC, HTMLAttributes, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface TabListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const TabList: FC<TabListProps> = ({ children, className, ...props }) => {
  return (
    <ul
      className={twMerge("flex border-b border-gray-100", className)}
      {...props}
    >
      {children}
    </ul>
  );
};
export default TabList;
