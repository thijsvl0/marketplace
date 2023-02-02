import ChangeAvatar from "../../components/me/ChangeAvatar";
import Head from "next/head";
import InnerLayout from "../../components/me/InnerLayout";
import type { NextPage } from "next";
import Section from "../../components/common/Section";
import YourItems from "../../components/me/YourItems";

const Me: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`My Details | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <InnerLayout>
        <Section title="Your Items">
          <YourItems />
        </Section>
        <Section title="Change Avatar">
          <ChangeAvatar />
        </Section>
      </InnerLayout>
    </>
  );
};

export default Me;
