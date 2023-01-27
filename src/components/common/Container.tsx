import type { FC, ReactNode } from "react";

import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-screen-xl gap-8 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};
export default Container;
