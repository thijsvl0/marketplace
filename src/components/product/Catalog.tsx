import type { Product, Image as iImage } from "@prisma/client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface CatalogProps {
  products: (Product & {
    images: iImage[];
  })[];
}

const Catalog: FC<CatalogProps> = ({ products }) => {
  return (
    <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${String(product.slug)}`}
          className="group block"
        >
          <div className="relative aspect-square overflow-hidden rounded">
            {product.images[0] && (
              <Image
                src={process.env.NEXT_PUBLIC_STATIC_URL + product.images[0].key}
                alt=""
                fill={true}
                className="object-cover"
              />
            )}
          </div>

          <div className="mt-3 flex items-start justify-between">
            <h3 className="truncate font-medium text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {product.title}
            </h3>
            <span className="text-lg text-gray-900">
              ${product.price.toString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Catalog;
