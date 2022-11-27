import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

export const NotFound = () => {
  return (
    <>
      <Container
        style={{
          paddingTop: "calc(50vh - 300px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <Typography variant="h1" align="center">
            404
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontFamily: "century gothic",
              mb: 3,
              mt: { xs: 3, md: 0 },
            }}
          >
            Page not found
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/"
              sx={{
                fontFamily: "century gothic",
                mt: 1,
                mb: 2,
                height: 50,
                fontSize: 20,
                fontWeight: 600,
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Go to Home
            </Button>
          </Box>
        </div>
      </Container>
    </>
  );
};
