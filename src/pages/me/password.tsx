import ChangePassword from "../../components/me/ChangePassword";
import Head from "next/head";
import InnerLayout from "../../components/me/InnerLayout";
import type { NextPage } from "next";
import Section from "../../components/common/Section";

const Password: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Password | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <InnerLayout>
        <Section title="Change Password">
          <ChangePassword />
        </Section>
      </InnerLayout>
    </>
  );
};

export default Password;
