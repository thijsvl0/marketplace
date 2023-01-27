import type { FC, ReactNode } from "react";

interface TheadProps {
  children: ReactNode;
}

const Thead: FC<TheadProps> = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};
export default Thead;
