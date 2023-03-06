import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import Container from "../../components/common/Container";
import Detail from "../../components/product/Detail";
import Head from "next/head";
import type { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Product: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
}) => {
  return (
    <>
      <Head>
        <title>{`${product.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <Container>
        <Detail product={product} />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { prisma } = await import("../../server/db");

  const { slug } = ctx.params as Params;

  const product = await prisma.product.findFirst({
    include: { images: true, user: true },
    where: { slug },
  });

  if (!product) return { notFound: true };

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export default Product;
