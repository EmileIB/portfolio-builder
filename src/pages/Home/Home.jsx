import { Container } from "@mui/system";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";

export const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (user.isSignedIn) navigate("/editor");

  const buttons = [
    {
      name: "Login to save your progress",
      link: "/login",
    },
    {
      name: "Continue as guest",
      link: "/editor",
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 115px)",
          }}
        >
          <div style={{ width: "100vw" }}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontFamily: "century gothic",
                mb: 1,
              }}
            >
              Welcome to <strong>PGEN!</strong>
            </Typography>
            <Typography variant="h5" align="center">
              Your ultimate portfolio generator.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                maxWidth: "600px",
                mt: 6,
                mx: "auto",
              }}
            >
              {buttons.map((button) => (
                <Button
                  key={button.name}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(button.link)}
                  sx={{
                    maxWidth: "200px",
                    fontWeight: "bold",
                  }}
                >
                  {button.name}
                </Button>
              ))}
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
};
