import type { InferGetServerSidePropsType, NextPage } from "next";

import Container from "../components/common/Container";
import Head from "next/head";
import ProductList from "../components/product/Catalog";

const Products: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  return (
    <>
      <Head>
        <title>{`Products | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
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

export default Products;
