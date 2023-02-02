import type { ChangeEventHandler, FC } from "react";

import Image from "next/image";
import { useState } from "react";

interface ChangeAvatarProps {}

const ChangeAvatar: FC<ChangeAvatarProps> = ({}) => {
  const [avatar, setAvatar] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) setAvatar(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <Image src={avatar} width={300} height={300} alt="User Avatar" />
      <input type="file" onChange={onChange} />
    </>
  );
};
export default ChangeAvatar;
