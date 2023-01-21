import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import { formatDate } from "../../helpers/global-functions";

export const ExperienceSection = () => {
  const experience = useSelector((state) => state.experience);

  const ExperienceItem = ({ item }) => {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: "century gothic" }}>
            {item.company}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "century gothic" }}>
            {formatDate(item.start)} - {formatDate(item.end)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            padding: "0 1rem",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "century gothic" }}>
            {item.position}
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
      {experience.length > 0 && (
        <Typography variant="h3" sx={{ fontFamily: "century gothic", mb: 2 }}>
          Experience
        </Typography>
      )}
      {experience.map((item) => (
        <div
          key={item._id}
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
