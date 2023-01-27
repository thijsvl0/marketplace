import type { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title: string;
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="py-8">
      <div className="flex pb-8">
        <div className="flex flex-col justify-center">
          <h3 className="text-md font-medium text-gray-700">{title}</h3>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
};
export default Section;
