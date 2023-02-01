import type { FC, ReactNode } from "react";

import Container from "../common/Container";
import TabItem from "../common/tab/TabItem";
import TabList from "../common/tab/TabList";

interface InnerLayoutProps {
  children: ReactNode;
}

const InnerLayout: FC<InnerLayoutProps> = ({ children }) => {
  return (
    <Container>
      <h2 className="my-4 text-2xl font-medium text-gray-900">Settings</h2>
      <TabList>
        <TabItem link="/me">My Details</TabItem>
        <TabItem link="/me/password">Password</TabItem>
      </TabList>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </Container>
  );
};
export default InnerLayout;
