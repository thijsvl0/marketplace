import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import ChangeAvatar from "../../components/me/ChangeAvatar";
import Head from "next/head";
import InnerLayout from "../../components/me/InnerLayout";
import Section from "../../components/common/Section";
import YourItems from "../../components/me/YourItems";
import { getSession } from "next-auth/react";
import { prisma } from "../../server/db";

const Me: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
}) => {
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
          <ChangeAvatar avatar={user.avatar?.key} />
        </Section>
      </InnerLayout>
    </>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const session = await getSession({ req });

  const user = await prisma.user.findFirstOrThrow({
    where: { id: session?.user?.id },
    include: {
      avatar: true,
    },
  });

  return {
    props: { user },
  };
};

export default Me;
