import type { FC, ReactNode } from "react";

interface ThProps {
  children: ReactNode;
}

const Th: FC<ThProps> = ({ children }) => {
  return (
    <th className="whitespace-nowrap py-2.5 px-4 text-left font-medium text-gray-900">
      {children}
    </th>
  );
};
export default Th;
