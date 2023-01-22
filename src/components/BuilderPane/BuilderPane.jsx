import { Button, Container } from "@mui/material";
import { PersonalForm } from "../PersonalForm";
import { EducationForm } from "../EducationForm";
import { ExperienceForm } from "../ExperienceForm";
import { ProjectsForm } from "../ProjectsForm";


export const BuilderPane = ({ handleDeploy }) => {
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
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "50%",
              fontWeight: "bold",
            }}
            onClick={handleDeploy}
          >
            Deploy Portfolio
          </Button>
        </div>
      </Container>
    </>
  );
};
