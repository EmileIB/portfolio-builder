// footer component with MUI

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const MainFooter = () => {
  return (
    <Box
      sx={{
        bgcolor: "#073763",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          Copyright © 2022 PGEN
        </Typography>
      </Container>
    </Box>
  );
};
