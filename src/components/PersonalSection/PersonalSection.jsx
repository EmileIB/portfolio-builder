import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

export const PersonalSection = () => {
  const info = useSelector((state) => state.info);

  return (
    <Box>
      <Typography variant="h3" sx={{ fontFamily: "century gothic", mb: 2 }}>
        {info.position}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "century gothic",
          "& > span": {
            display: "block",
            marginTop: "5px",
          },
        }}
      >
        {info.about.split("\n").map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </Typography>
    </Box>
  );
};
