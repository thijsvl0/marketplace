import A from "../A";
import type { FC } from "react";
import Link from "next/link";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";

interface NavbarProps {}

const linkItems = [
  { link: "/", label: "Home" },
  { link: "/products", label: "Products" },
];

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" className="hidden md:block">
        <ul className="flex items-center gap-6">
          {linkItems.map((linkItem) => (
            <li key={linkItem.link}>
              <Link href={linkItem.link} passHref legacyBehavior>
                <A>{linkItem.label}</A>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex sm:gap-4">
          <UserMenu />
        </div>
        <div className="md:hidden">
          <NavMenu linkItems={linkItems} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
