import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ControlledAccordion = ({ items }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {items.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-bh-content`}
            id={`${item.id}-bh-header`}
          >
            <Typography
              sx={{
                width: "100%",
                flexShrink: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginRight: "1rem",
              }}
            >
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{item.content}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
