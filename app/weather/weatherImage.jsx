import React from "react";
import Image from "next/image";

function WatherImage({ weatherImage, description }) {
  return (
    <Image
      src={"https://openweathermap.org/img/wn/" + weatherImage + "@2x.png"}
      alt={description}
      width={80}
      height={80}
    />
  );
}

export default WatherImage;
