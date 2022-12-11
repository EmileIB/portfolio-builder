import { Container } from "@mui/material";
import { PersonalForm } from "../PersonalForm";
import { EducationForm } from "../EducationForm";

export const BuilderPane = () => {
  const Divider = () => {
    return (
      <div
        style={{
          width: "100%",
          margin: "1rem 0",
        }}
      />
    );
  };

  return (
    <>
      <Container
        style={{
          paddingTop: "1rem",
          height: "100%",
          overflow: "auto",
        }}
      >
        <PersonalForm />
        <Divider />
        <EducationForm />
      </Container>
    </>
  );
};
