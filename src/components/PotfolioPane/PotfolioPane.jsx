import { Container } from "@mui/material";
import { PortfolioAppBar } from "../PortfolioAppBar";

export const PotfolioPane = () => {
  return (
    <>
      <PortfolioAppBar />
      <Container
        style={{
          paddingTop: "1rem",
        }}
      >
        <h1>Right Pane</h1>
      </Container>
    </>
  );
};
