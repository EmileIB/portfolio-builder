import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";

import { toast } from "react-toastify";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useState } from "react";

import { setCustonmLink } from "../../utils/portfolio-helper";

export const DeployedDialog = ({
  isOpen,
  setIsOpen,
  portfolioId,
  customLink,
  setCustomLink,
}) => {
  const [linkErrorText, setLinkErrorText] = useState("");

  const parseLink = (link) => {
    let parsedLink = link.replace(/[^a-zA-Z0-9- ]/g, "");
    parsedLink = parsedLink.replace(/ /g, "-");
    if (parsedLink.length === 1 && parsedLink === "-") return "";
    if (parsedLink.slice(-2) === "--") {
      parsedLink = parsedLink.slice(0, -1);
    }
    // if lenght is greater than 15, delete last char
    if (parsedLink.length > 20) {
      parsedLink = parsedLink.slice(0, -1);
    }
    return parsedLink;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deployed Successfully"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your portfolio has been deployed successfully! You can access it by
          opening the following link in a new tab:
        </DialogContentText>
        {/* Link with copy button at the right */}
        <Paper
          sx={{
            paddingInline: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {`http://localhost:3000/portfolio/${portfolioId}`}
            </Typography>
            <Tooltip title="Copy to clipboard">
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    `http://localhost:3000/portfolio/${portfolioId}`
                  );
                  toast.success("Copied to clipboard!");
                }}
              >
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
        <DialogContentText sx={{ mt: 2 }}>
          You can also customize your link to something more memorable and
          catchy!
        </DialogContentText>
        <TextField
          sx={{ width: "100%", mt: 2 }}
          variant="outlined"
          value={customLink}
          onChange={(e) => setCustomLink(parseLink(e.target.value))}
          error={linkErrorText !== ""}
          helperText={linkErrorText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Update link">
                  <IconButton
                    onClick={() => {
                      if (customLink === "") {
                        setLinkErrorText("Path cannot be empty!");
                      } else {
                        setLinkErrorText("");
                        setCustonmLink(portfolioId, customLink).then((res) => {
                          if (res.success) {
                            toast.success("Path updated successfully!");
                          } else {
                            setLinkErrorText(res.message);
                          }
                        });
                      }
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:3000/portfolio/${customLink}`
                      );
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                http://localhost:3000/portfolio/
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>close</Button>
      </DialogActions>
    </Dialog>
  );
};
