import type { Product, Image as iImage } from "@prisma/client";

import Button from "../common/form/Button";
import type { FC } from "react";
import Image from "next/image";
import Input from "../common/form/Input";

interface ProductDetailProps {
  product: Product & {
    images: iImage[];
  };
}

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  return (
    <section>
      <div className="relative mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded">
            <Image
              src={
                product.images[0]
                  ? process.env.NEXT_PUBLIC_STATIC_URL + product.images[0].key
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
              }
              alt=""
              fill={true}
              className="object-cover"
            />
          </div>

          <div className="sticky top-0">
            <div className="mt-8 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {product.title}
                </h1>
              </div>

              <p className="text-lg font-bold">${product.price}</p>
            </div>

            <div className="mt-4">
              <div className="prose max-w-none break-all">
                <p>{product.description}</p>
              </div>
            </div>

            <form className="mt-8">
              <div className="mt-8 flex gap-4">
                <div>
                  <Input
                    type="number"
                    min={1}
                    className="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <Button>Add to Cart</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
