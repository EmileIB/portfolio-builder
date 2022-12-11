import React, { useEffect } from "react";

import { Box, Card, TextField, Typography, FormControl } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setAbout,
  setEmail,
  setPosition,
} from "../../state/infoSlice";

export const PersonalForm = () => {
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();

  // on reload, get state from local storage
  useEffect(() => {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return;
    const state = JSON.parse(serializedState);
    dispatch(setName(state.info.name));
    dispatch(setEmail(state.info.email));
    dispatch(setPosition(state.info.position));
    dispatch(setAbout(state.info.about));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "1rem",
            }}
          >
            Personal Information
          </Typography>

          <FormControl sx={{ width: "100%", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              value={info.name}
              onChange={(e) => dispatch(setName(e.target.value))}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={info.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="Position"
              variant="outlined"
              value={info.position}
              onChange={(e) => dispatch(setPosition(e.target.value))}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <TextField
              id="outlined-basic"
              label="About Me"
              variant="outlined"
              multiline
              rows={4}
              value={info.about}
              onChange={(e) => dispatch(setAbout(e.target.value))}
            />
          </FormControl>
        </Box>
      </Card>
    </>
  );
};
