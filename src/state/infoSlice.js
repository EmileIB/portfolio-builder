import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  position: "",
  about: "",
  media: {
    github: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    website: "",
  },
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setMediaType: (state, action) => {
      state.media[action.payload.type] = action.payload.value;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setPosition,
  setAbout,
  setMedia,
  setMediaType,
  setInfo,
} = infoSlice.actions;

export default infoSlice.reducer;
