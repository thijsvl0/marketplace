import Container from "../components/common/Container";
import Image from "next/image";
import type { NextPage } from "next";
import { api } from "../utils/api";

const Products: NextPage = () => {
  const { data: getProducts, status } = api.product.getProducts.useQuery();

  if (status == "loading") return <>Loading....</>;

  return (
    <Container>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getProducts &&
          getProducts.products.map((product) => (
            <a key={product.id} href="#" className="group block">
              <div className="relative aspect-square overflow-hidden rounded">
                <Image
                  src={
                    product.images[0]
                      ? process.env.NEXT_PUBLIC_STATIC_URL +
                        product.images[0].key
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
                  }
                  alt=""
                  fill={true}
                  className="object-cover"
                />
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700">
                  ${product.price.toString()}
                </p>
              </div>
            </a>
          ))}
      </div>
    </Container>
  );
};

export default Products;
