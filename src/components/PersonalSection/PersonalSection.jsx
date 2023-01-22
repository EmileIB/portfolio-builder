import { Box, Typography, IconButton } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";

export const PersonalSection = ({ info, innerRef }) => {
  const mediaLogos = {
    github: <GitHubIcon />,
    linkedin: <LinkedInIcon />,
    twitter: <TwitterIcon />,
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    youtube: <YouTubeIcon />,
    website: <LanguageIcon />,
  };

  const mediButton = (media) => {
    return (
      <IconButton
        key={media}
        href={info.media[media]}
        target="_blank"
        rel="noreferrer"
        sx={{
          color: "white",
          "&:hover": {
            color: "white",
          },
        }}
      >
        {mediaLogos[media]}
      </IconButton>
    );
  };

  return (
    <Box>
      <Box xs={{ mb: 2 }}>
        <Typography
          variant="h3"
          sx={{ fontFamily: "century gothic" }}
          ref={innerRef}
        >
          {info.position}
        </Typography>
        {info.email && (
          <IconButton
            href={`mailto:${info.email}`}
            sx={{
              color: "white",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <EmailIcon />
          </IconButton>
        )}
        {Object.keys(info.media).map(
          (media) => info.media[media] && mediButton(media)
        )}
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "century gothic",
          "& > span": {
            display: "block",
            marginTop: "5px",
          },
        }}
      >
        {info.about.split("\n").map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </Typography>
    </Box>
  );
};
