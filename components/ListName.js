import Image from "next/image";
import React from "react";

function ListName({ name, image }) {
  //   console.log(image);
  return (
    <div>
      <div className="flex items-center space-x-3 ">
        <Image
          src={image}
          objectFit="cover"
          layout="fixed"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}

export default ListName;
