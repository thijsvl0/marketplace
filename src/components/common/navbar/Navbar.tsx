import A from "../A";
import Button from "../form/Button";
import type { FC } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

interface NavbarProps {}

const linkItems = [
  { link: "/", label: "Home" },
  { link: "/products", label: "Products" },
];

const Navbar: FC<NavbarProps> = ({}) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          {linkItems.map((linkItem, key) => (
            <li key={key}>
              <Link href={linkItem.link} passHref legacyBehavior>
                <A>{linkItem.label}</A>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          {session ? (
            <>
              <UserMenu />
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button>Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="hidden sm:block">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        <Button variant="outline" size="square" className="md:hidden">
          <span className="sr-only">Toggle menu</span>
          <FiMenu size="1.25rem" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
