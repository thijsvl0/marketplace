import { ChangeEventHandler, FC, useRef } from "react";

import Button from "../common/form/Button";
import { FiTrash } from "react-icons/fi";
import Image from "next/image";
import { api } from "../../utils/api";
import { useEffect } from "react";
import { useState } from "react";

interface ChangeAvatarProps {
  avatar: string | undefined;
}

const ChangeAvatar: FC<ChangeAvatarProps> = ({ avatar }) => {
  const [image, setImage] = useState<string>(
    avatar
      ? process.env.NEXT_PUBLIC_STATIC_URL + avatar
      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
  );
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: getUploadUrl } = api.user.getUploadUrl.useMutation();
  const { mutate: changeAvatar } = api.user.changeAvatar.useMutation();

  useEffect(() => {
    if (!file) return;

    const uploadAvatar = async () => {
      const type = file.type.split("/").pop();
      if (!type) return;

      const uploadUrl = await getUploadUrl({ type });

      await fetch(uploadUrl.url, { method: "PUT", body: file });

      changeAvatar({ avatar: uploadUrl.key });

      setImage(process.env.NEXT_PUBLIC_STATIC_URL + uploadUrl.key);
    };

    setImage(URL.createObjectURL(file));

    uploadAvatar().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);
  };
  return (
    <div className="flex gap-x-4">
      <div className="flex items-center justify-center">
        <div className="relative h-48 w-48 overflow-hidden rounded-full">
          <Image
            src={image}
            alt="User Avatar"
            fill={true}
            className="object-cover"
          />
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 ">
        <Button onClick={() => inputRef.current?.click()}>Change</Button>
        <Button
          variant="secondaryTransparent"
          className="flex items-center gap-x-2"
        >
          <FiTrash size="1.25rem" />
          Delete
        </Button>
      </div>
    </div>
  );
};
export default ChangeAvatar;
