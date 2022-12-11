import { Container } from "@mui/material";

import { PersonalForm } from "../PersonalForm";

export const BuilderPane = () => {
  return (
    <>
      <Container
        style={{
          paddingTop: "1rem",
        }}
      >
        <PersonalForm />
      </Container>
    </>
  );
};
