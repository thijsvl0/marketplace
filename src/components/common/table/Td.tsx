import type { FC, ReactNode } from "react";

interface TdProps {
  children: ReactNode;
}

const Td: FC<TdProps> = ({ children }) => {
  return (
    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{children}</td>
  );
};
export default Td;
