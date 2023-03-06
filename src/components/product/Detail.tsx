import type { Product, User, Image as iImage } from "@prisma/client";

import Button from "../common/form/Button";
import type { FC } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";

interface DetailProps {
  product: Product & {
    images: iImage[];
    user: User;
  };
}

const Detail: FC<DetailProps> = ({ product }) => {
  return (
    <div className="relative mx-auto max-w-screen-xl py-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
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
          <div className="grid grid-cols-2 gap-4 lg:mt-4">
            {product.images.slice(1).map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded"
              >
                <Image
                  src={process.env.NEXT_PUBLIC_STATIC_URL + image.key}
                  alt=""
                  fill={true}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-0">
          <div className="mt-8 flex justify-between">
            <h2 className="max-w-[35ch] text-xl font-bold text-gray-900 sm:text-2xl">
              {product.title}
            </h2>

            <p className="text-lg font-bold text-gray-900">${product.price}</p>
          </div>
          <div className="mt-4">
            <div className="break-words leading-relaxed text-gray-700">
              {product.description}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-gray-500">Sold by {product.user.username}</div>
          </div>
          <form className="mt-8">
            <div className="mt-8 flex gap-4">
              <Button type="button">Buy Now</Button>
              <Button
                type="button"
                size="square"
                Icon={FiShoppingCart}
                variant="outline"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Detail;
