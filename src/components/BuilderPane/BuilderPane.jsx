import { Container } from "@mui/material";
import { PersonalForm } from "../PersonalForm";
import { EducationForm } from "../EducationForm";
import { ExperienceForm } from "../ExperienceForm";
import { ProjectsForm } from "../ProjectsForm";

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
        }}
      >
        <PersonalForm />
        <Divider />
        <EducationForm />
        <Divider />
        <ExperienceForm />
        <Divider />
        <ProjectsForm />
      </Container>
    </>
  );
};
