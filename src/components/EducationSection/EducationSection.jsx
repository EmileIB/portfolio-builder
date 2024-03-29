import { Box, Typography } from "@mui/material";

import { formatDate } from "../../helpers/global-functions";

export const EducationSection = ({ education, innerRef }) => {
  const EducationItem = ({ item }) => {
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
            {item.school}
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
            {item.degree}
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
      {education.length > 0 && (
        <Typography
          variant="h3"
          sx={{ fontFamily: "century gothic", mb: 2 }}
          ref={innerRef}
        >
          Education
        </Typography>
      )}
      {education.map((item) => (
        <div
          key={item._id}
          style={{
            marginBottom: "1rem",
          }}
        >
          <EducationItem item={item} />
        </div>
      ))}
    </Box>
  );
};
