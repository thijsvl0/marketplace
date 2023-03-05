import type { InferGetStaticPropsType } from "next";
import { type NextPage } from "next";
import Container from "../components/common/Container";
import ProductList from "../components/product/ProductList";
import { prisma } from "../server/db";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products,
}) => {
  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
};

export const getStaticProps = async () => {
  const products = await prisma.product.findMany({
    include: { images: true },
  });

  return {
    props: {
      products,
    },
    revalidate: 86400,
  };
};

export default Home;
