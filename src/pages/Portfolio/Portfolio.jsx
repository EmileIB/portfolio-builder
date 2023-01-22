import { PortfolioPane } from "../../components";
import { getPortfolio } from "../../utils/portfolio-helper";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
export const Portfolio = () => {
  const [state, setState] = useState({
    info: {
      name: "",
      email: "",
      position: "",
      about: "",
      media: {
        github: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
        youtube: "",
        website: "",
      },
    },
    education: [],
    experience: [],
    projects: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    console.log(id);
    getPortfolio(id).then((res) => {
      if (res.success) {
        console.log(res.data);
        setState({
          info: res.data.info,
          education: res.data.educations,
          experience: res.data.experiences,
          projects: res.data.projects,
        });
      } else {
        navigate("/404");
      }
    });
  }, [navigate]);

  return (
    <>
      <PortfolioPane state={state} />
    </>
  );
};
