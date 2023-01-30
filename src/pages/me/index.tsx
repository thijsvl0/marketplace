import ChangePassword from "../../components/me/ChangePassword";
import Container from "../../components/common/Container";
import Head from "next/head";
import type { NextPage } from "next";
import Section from "../../components/common/Section";
import YourItems from "../../components/me/YourItems";

const Me: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`My Profile | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Section title="Change Password">
          <ChangePassword />
        </Section>
        <Section title="Your Items">
          <YourItems />
        </Section>
      </Container>
    </>
  );
};

export default Me;
