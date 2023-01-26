import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

import Button from "../form/Button";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = ({}) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center gap-1 text-teal-700">
          <div>{session.user?.email}</div>
          <div>
            <FiChevronDown />
          </div>
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-gray-100 bg-white shadow-lg">
            <div className="px-1 py-1">
              <Menu.Item>
                <Link href="/profile">
                  <Button
                    className="w-full text-left font-normal"
                    variant="secondaryTransparent"
                  >
                    My Profile
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Button
                  className="w-full text-left font-normal"
                  variant="secondaryTransparent"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
export default UserMenu;
