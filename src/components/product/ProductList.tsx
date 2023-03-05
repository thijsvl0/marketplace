import type { Product, Image as iImage } from "@prisma/client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

interface ProductListProps {
  products: (Product & {
    images: iImage[];
  })[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${String(product.slug)}`}
          className="group block"
        >
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

          <div className="mt-3">
            <h3 className="truncate font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              ${product.price.toString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductList;
