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
  }, [dispatch]);

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: "century gothic",
          }}
        >
          Personal Information
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            value={info.name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={info.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="outlined-basic"
            label="Position"
            variant="outlined"
            value={info.position}
            onChange={(e) => dispatch(setPosition(e.target.value))}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
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
  );
};
