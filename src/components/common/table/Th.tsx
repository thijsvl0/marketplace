import type { FC, ReactNode } from "react";

interface ThProps {
  children: ReactNode;
}

const Th: FC<ThProps> = ({ children }) => {
  return (
    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
      {children}
    </th>
  );
};
export default Th;
