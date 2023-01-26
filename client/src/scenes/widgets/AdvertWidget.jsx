import { Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import config from "config";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  /* Base64 to Image */
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getImageSrc = async () => {
    setIsLoading(true);
    const response = await fetch(`${config.app.url}assets/info4.jpeg`);
    const base64 = await response.text();
    const img_src = "data:image/png;base64," + base64;
    setImgSrc(img_src);
    setIsLoading(false);
  };

  useEffect(() => {
    getImageSrc();
  }, []);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={imgSrc}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Jamstones</Typography>
        <Typography color={medium}>jamstones.sg</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        High quality crystal products with a modern twist
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
