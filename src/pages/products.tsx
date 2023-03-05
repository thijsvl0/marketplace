import type { InferGetServerSidePropsType, NextPage } from "next";

import Container from "../components/common/Container";
import ProductList from "../components/product/ProductList";

const Products: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  return (
    <Container>
      <ProductList products={products} />
    </Container>
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
