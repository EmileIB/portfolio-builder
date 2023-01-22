import { Container } from "@mui/material";
import { PortfolioAppBar } from "../PortfolioAppBar";

import { PersonalSection } from "../PersonalSection";
import { EducationSection } from "../EducationSection";
import { ExperienceSection } from "../ExperienceSection";
import { ProjectsSection } from "../ProjectsSection";

import { useRef, createRef } from "react";

const pages = [
  {
    name: "About Me",
    scrollTo: "personal",
  },
  {
    name: "Education",
    scrollTo: "education",
  },
  {
    name: "Work Experience",
    scrollTo: "experience",
  },
  {
    name: "Projects",
    scrollTo: "projects",
  },
];

export const PortfolioPane = ({ state }) => {
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

  const sectionsRefs = useRef(
    pages.reduce((acc, page) => {
      acc[page.scrollTo] = createRef();
      return acc;
    }, {})
  );

  const scrollToSection = (section) => {
    const sectionRef = sectionsRefs.current[section];
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <PortfolioAppBar
        scrollTo={scrollToSection}
        pages={pages}
        name={state.info.name}
      />
      <Container
        style={{
          marginTop: "1rem",
        }}
      >
        <PersonalSection
          info={state.info}
          innerRef={sectionsRefs.current.personal}
        />
        <Devider />
        <EducationSection
          education={state.education}
          innerRef={sectionsRefs.current.education}
        />
        <Devider />
        <ExperienceSection
          experience={state.experience}
          innerRef={sectionsRefs.current.experience}
        />
        <Devider />
        <ProjectsSection
          projects={state.projects}
          innerRef={sectionsRefs.current.projects}
        />
        <Devider />
      </Container>
    </>
  );
};
