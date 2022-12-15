import { Container } from "@mui/material";
import { PortfolioAppBar } from "../PortfolioAppBar";

import { PersonalSection } from "../PersonalSection";
import { EducationSection } from "../EducationSection";
import { ExperienceSection } from "../ExperienceSection";
import { ProjectsSection } from "../ProjectsSection";

export const PotfolioPane = () => {
  const Devider = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "1px",
          margin: "10px 0",
        }}
      />
    );
  };

  return (
    <>
      <PortfolioAppBar />
      <Container
        style={{
          marginTop: "1rem",
        }}
      >
        <PersonalSection />
        <Devider />
        <EducationSection />
        <Devider />
        <ExperienceSection />
        <Devider />
        <ProjectsSection />
        <Devider />
      </Container>
    </>
  );
};
