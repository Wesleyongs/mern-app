import { Box } from "@mui/material";
import config from "config";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${config.app.url}${image}`}
      />
    </Box>
  );
};

export default UserImage;
