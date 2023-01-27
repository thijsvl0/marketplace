import Container from "./Container";
import type { FC } from "react";
import { FiGift } from "react-icons/fi";
import Link from "next/link";
import Navbar from "./Navbar";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header aria-label="Site Header" className="bg-white">
      <Container className="flex h-16 items-center">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <FiGift size={"24px"} />
        </Link>
        <Navbar />
      </Container>
    </header>
  );
};
export default Header;
