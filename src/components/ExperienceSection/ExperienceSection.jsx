import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

export const ExperienceSection = () => {
  const experience = useSelector((state) => state.experience);

  const ExperienceItem = ({ item }) => {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontFamily: "century gothic", mb: 0.5 }}>
          {item.company}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            padding: "0 1rem",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "century gothic" }}>
            {item.position}
          </Typography>

          <Typography variant="body1" sx={{ fontFamily: "century gothic" }}>
            {item.start} - {item.end}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            "& > span": {
              display: "block",
              marginTop: "1px",
              padding: "0 1rem",
            },
          }}
        >
          {item.description.split("\n").map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontFamily: "century gothic", mb: 2 }}>
        Experience
      </Typography>
      {experience.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: "1rem",
          }}
        >
          <ExperienceItem item={item} />
        </div>
      ))}
    </Box>
  );
};
