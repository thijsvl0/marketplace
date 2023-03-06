import type { InferGetServerSidePropsType } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import Container from "../components/common/Container";
import ProductList from "../components/product/Catalog";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  return (
    <>
      <Head>
        <title>{`Home | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
};

export const getServerSideProps = async () => {
  const { prisma } = await import("../server/db");

  const products = await prisma.product.findMany({
    include: { images: true },
  });

  return {
    props: {
      products,
    },
  };
};

export default Home;
