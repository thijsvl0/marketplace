import Button from "./form/Button";
import type { FC } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

interface NavbarProps {}

const linkItems = [{ link: "/", label: "Products" }];

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          {linkItems.map((linkItem, key) => (
            <li key={key}>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href={linkItem.link}
              >
                {linkItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <Link href="/auth/signin">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="secondary" className="hidden sm:block">
              Register
            </Button>
          </Link>
        </div>

        <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
          <span className="sr-only">Toggle menu</span>
          <FiMenu />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
