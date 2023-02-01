import type { FC, ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const Table: FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        {children}
      </table>
    </div>
  );
};
export default Table;
