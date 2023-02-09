import { FC, ReactNode, useEffect, useState } from "react";

import Container from "../common/Container";
import Select from "../common/form/Select";
import TabItem from "../common/tab/TabItem";
import TabList from "../common/tab/TabList";
import { useRouter } from "next/router";

const linkItems = [
  { link: "/me", label: "My Details" },
  { link: "/me/password", label: "Password" },
];

interface InnerLayoutProps {
  children: ReactNode;
}

const InnerLayout: FC<InnerLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<string>(router.pathname);

  useEffect(() => {
    if (!currentRoute) return;

    router.push(currentRoute).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

  return (
    <Container>
      <h2 className="my-4 text-2xl font-medium text-gray-900">Settings</h2>
      <TabList className="hidden sm:flex">
        {linkItems.map((linkItem) => (
          <TabItem
            key={linkItem["link"]}
            link={linkItem["link"]}
            isActive={currentRoute == linkItem["link"]}
          >
            {linkItem["label"]}
          </TabItem>
        ))}
      </TabList>
      <Select
        onChange={(e) => setCurrentRoute(e.target.value)}
        className="flex sm:hidden"
        value={currentRoute}
      >
        {linkItems.map((linkItem) => (
          <option key={linkItem["link"]} value={linkItem["link"]}>
            {linkItem["label"]}
          </option>
        ))}
      </Select>
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
        {children}
      </div>
    </Container>
  );
};
export default InnerLayout;
