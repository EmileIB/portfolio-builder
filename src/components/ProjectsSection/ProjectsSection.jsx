import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { useResizeDetector } from "react-resize-detector";

export const ProjectsSection = () => {
  const projects = useSelector((state) => state.projects);

  const { width, ref } = useResizeDetector();
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    if (width < 600) {
      setDisplay("xs");
    } else if (width < 960) {
      setDisplay("md");
    } else {
      setDisplay("lg");
    }
  }, [width]);

  return (
    <Box ref={ref}>
      {projects.length > 0 && (
        <Typography variant="h3" sx={{ fontFamily: "century gothic", mb: 2 }}>
          Projects
        </Typography>
      )}
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid
            item
            xs={display === "xs" ? 12 : display === "md" ? 6 : 4}
            key={project._id}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                onClick={() => window.open(project.link)}
              />
              <CardContent
                sx={{
                  height: "160px",
                  "&:hover": {
                    cursor: "text",
                  },
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.title}
                </Typography>
                {/* long scrollable description */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    overflow: "auto",
                    height: "100%",
                    "& > span": {
                      display: "block",
                    },
                  }}
                >
                  {project.description.split("\n").map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
