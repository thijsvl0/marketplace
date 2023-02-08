import { ChangeEventHandler, FC, useEffect } from "react";

import Image from "next/image";
import { api } from "../../utils/api";
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
    <div className="grid grid-cols-3 gap-x-2">
      <Image
        className="rounded-full"
        src={image}
        width={300}
        height={300}
        alt="User Avatar"
      />
      <div className="col-span-2">
        <input type="file" onChange={onChange} />
      </div>
    </div>
  );
};
export default ChangeAvatar;
