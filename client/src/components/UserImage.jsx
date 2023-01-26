import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import config from "config";

const UserImage = ({ image, size = "60px" }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getImageSrc = async () => {
    setIsLoading(true);
    const response = await fetch(`${config.app.url}assets/${image}`);
    const base64 = await response.text();
    const img_src = "data:image/png;base64," + base64;
    setImgSrc(img_src);
    setIsLoading(false);
  };

  useEffect(() => {
    getImageSrc();
  }, [image]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Box width={size} height={size}>
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={imgSrc}
        />
      </Box>
    );
  }
};

export default UserImage;