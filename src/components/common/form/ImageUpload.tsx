import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
} from "react";
import { FiUpload, FiX } from "react-icons/fi";

import Image from "next/image";
import React from "react";
import { api } from "../../../utils/api";
import clsx from "clsx";
import { useState } from "react";

interface ImageUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "file";
}

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ className, type = "file", name, ...props }, ref) => {
    const [image, setImage] = useState<string>();
    const [key, setKey] = useState<string>();

    const { mutateAsync: getUploadUrl } = api.user.getUploadUrl.useMutation();

    const handleOnRemove: MouseEventHandler<HTMLButtonElement> = () => {
      setImage(undefined);
      setKey(undefined);
    };

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!e.target.files || !e.target.files[0]) return;
      const file = e.target.files[0];

      const uploadFile = async () => {
        const type = file.type.split("/").pop();
        if (!type) return;

        const uploadUrl = await getUploadUrl({ type });
        setKey(uploadUrl.key);

        await fetch(uploadUrl.url, { method: "PUT", body: file });

        setImage(process.env.NEXT_PUBLIC_STATIC_URL + uploadUrl.key);
      };

      setImage(URL.createObjectURL(file));

      uploadFile().catch(console.error);
    };

    return (
      <div>
        <div className="h-24 w-24">
          {image ? (
            <div
              className="relative h-full overflow-hidden rounded-md"
              onClick={console.log}
            >
              <Image
                src={image}
                fill={true}
                className="object-cover"
                alt="Image Upload"
              />
              <button
                onClick={handleOnRemove}
                className="absolute right-2 top-2 z-10 rounded-full bg-gray-800/75 p-1.5"
              >
                <FiX size="1rem" className="text-gray-400" />
              </button>
            </div>
          ) : (
            <label
              className={clsx(
                "flex h-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-200 text-gray-400",
                className
              )}
            >
              <FiUpload size="1.5rem" />
              <input type={type} className="hidden" onChange={handleOnChange} />
            </label>
          )}
        </div>
        <input
          ref={ref}
          type="text"
          id={name}
          name={name}
          value={key ?? ""}
          className="hidden"
          readOnly
          {...props}
        />
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
