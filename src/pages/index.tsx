import type { InferGetServerSidePropsType } from "next";
import { type NextPage } from "next";
import Container from "../components/common/Container";
import ProductList from "../components/product/ProductList";

const Home: NextPage<
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

export default Home;
