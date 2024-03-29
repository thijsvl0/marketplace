import type { FC, ReactNode } from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface TabItemProps {
  children: ReactNode;
  link: string;
  isActive?: boolean;
}

const TabItem: FC<TabItemProps> = ({ children, link, isActive = false }) => {
  return (
    <li>
      <Link className="relative block p-4" href={link}>
        <span
          className={twMerge(
            "absolute inset-x-0 -bottom-px h-px w-full",
            isActive && "bg-gray-900"
          )}
        ></span>
        <div className="flex items-center justify-center">
          <span
            className={twMerge(
              "font-medium hover:text-gray-700",
              isActive ? "text-gray-900" : "text-gray-500"
            )}
          >
            {children}
          </span>
        </div>
      </Link>
    </li>
  );
};
export default TabItem;
