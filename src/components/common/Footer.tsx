import {
  FiFacebook,
  FiGift,
  FiGithub,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

import { FC } from "react";
import Link from "next/link";

interface FooterProps {}

let linkItems = [
  { link: "/", label: "Home" },
  { link: "/auth/signin", label: "Login" },
];

const socialItems = [
  { link: "/", label: "Facebook", icon: <FiFacebook size="1.5rem" /> },
  { link: "/", label: "Instagram", icon: <FiInstagram size="1.5rem" /> },
  { link: "/", label: "Twitter", icon: <FiTwitter size="1.5rem" /> },
  { link: "/", label: "Github", icon: <FiGithub size="1.5rem" /> },
];

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer aria-label="Site Footer" className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-teal-600">
          <FiGift size={"2rem"} />
          <span className="text-lg font-semibold">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Where the world comes to shop, sell, and trade - One marketplace,
          endless opportunities
        </p>

        <nav aria-label="Footer Nav" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {linkItems.map((linkItem, key) => (
              <li key={key}>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href={linkItem.link}
                >
                  {linkItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {socialItems.map((socialItem, key) => (
            <li key={key}>
              <a
                href={socialItem.link}
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">{socialItem.label}</span>
                {socialItem.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
