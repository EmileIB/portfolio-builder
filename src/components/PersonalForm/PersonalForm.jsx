import React, { useEffect, useState } from "react";

import { Box, Card, TextField, Typography, FormControl } from "@mui/material";
import { MultipleSelectChip } from "../MultipleSelectChip";

import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setAbout,
  setEmail,
  setPosition,
  setMedia,
  setMediaType,
} from "../../state/infoSlice";

export const PersonalForm = () => {
  const info = useSelector((state) => state.info);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const dispatch = useDispatch();

  const mediaTypes = [
    "github",
    "linkedin",
    "twitter",
    "facebook",
    "instagram",
    "youtube",
    "website",
  ];

  const [selectedMedia, setSelectedMedia] = useState([]);

  const onSelectChange = (e) => {
    setSelectedMedia(e.target.value);
    if (e.target.value.length < selectedMedia.length) {
      const removedItem = selectedMedia.filter(
        (item) => !e.target.value.includes(item)
      );
      dispatch(setMedia({ [removedItem]: "" }));
    }
  };

  const parseSelectedMedia = (media) => {
    return Object.keys(media).filter((item) => {
      return media[item] !== "";
    });
  };

  useEffect(() => {
    if (isSignedIn) {
      setSelectedMedia(parseSelectedMedia(info.media));
      return;
    }
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return;
    const state = JSON.parse(serializedState);
    dispatch(setName(state.info.name));
    dispatch(setEmail(state.info.email));
    dispatch(setPosition(state.info.position));
    dispatch(setAbout(state.info.about));
    dispatch(setMedia(state.info.media));

    setSelectedMedia(parseSelectedMedia(state.info.media));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

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
            multiline={true}
            fullWidth
            rows={5}
            value={info.about}
            onChange={(e) => dispatch(setAbout(e.target.value))}
          />
        </FormControl>
        <MultipleSelectChip
          items={mediaTypes}
          onChange={onSelectChange}
          initialValue={selectedMedia}
        />
        {selectedMedia.map((item) => (
          <FormControl fullWidth sx={{ mb: 2 }} key={item}>
            <TextField
              id="outlined-basic"
              label={item.charAt(0).toUpperCase() + item.slice(1)}
              variant="outlined"
              value={info.media[item]}
              onChange={(e) =>
                dispatch(setMediaType({ type: item, value: e.target.value }))
              }
            />
          </FormControl>
        ))}
      </Box>
    </Card>
  );
};
