import type { FC, ReactNode } from "react";

interface TbodyProps {
  children: ReactNode;
}

const Tbody: FC<TbodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};
export default Tbody;
