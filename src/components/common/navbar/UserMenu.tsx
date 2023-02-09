import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

import Button from "../form/Button";
import type { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Fragment } from "react";
import Link from "next/link";
import { useProductStore } from "../../../stores/Product";

interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = ({}) => {
  const { data: session } = useSession();

  if (!session) return null;

  const setIsCreateModalOpen = useProductStore(
    (state) => state.setIsCreateModalOpen
  );

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center gap-1 text-teal-700 focus:outline-none">
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-gray-100 bg-white shadow-lg focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <Button
                  className="w-full text-left"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Start Selling!
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Link href="/me">
                  <Button className="w-full text-left" variant="transparant">
                    My Profile
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Button
                  className="w-full text-left"
                  variant="transparant"
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
