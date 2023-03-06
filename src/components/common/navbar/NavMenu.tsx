import { FiMenu, FiX } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

import Button from "../form/Button";
import type { FC } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { useProductStore } from "../../../stores/product";

interface NavMenuProps {
  linkItems: { link: string; label: string }[];
}

const NavMenu: FC<NavMenuProps> = ({ linkItems }) => {
  const { data: session } = useSession();
  const setIsCreateModalOpen = useProductStore(
    (state) => state.setIsCreateModalOpen
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button as={Button} variant="outline" size="square">
            <span className="sr-only">Toggle menu</span>
            {open ? <FiX size={"1.25rem"} /> : <FiMenu size={"1.25rem"} />}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-lg focus:outline-none">
              <div className="p-2">
                {linkItems.map((linkItem) => (
                  <Menu.Item as={Link} key={linkItem.link} href={linkItem.link}>
                    <Button className="w-full text-left" variant="transparant">
                      {linkItem.label}
                    </Button>
                  </Menu.Item>
                ))}
              </div>
              <div className="p-2">
                {session?.user ? (
                  <>
                    <Menu.Item
                      as={Button}
                      className="w-full text-left"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      Start Selling!
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/me">
                        <Button
                          className="w-full text-left"
                          variant="transparant"
                        >
                          My Profile
                        </Button>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      as={Button}
                      className="w-full text-left"
                      variant="transparant"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item as={Link} href="/auth/signin">
                      <Button
                        className="w-full text-left"
                        variant="transparant"
                      >
                        Login
                      </Button>
                    </Menu.Item>
                    <Menu.Item as={Link} href="/auth/signup">
                      <Button className="w-full text-left">Register</Button>
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default NavMenu;
