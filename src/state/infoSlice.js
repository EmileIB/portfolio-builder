import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  position: "",
  about: "",
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
  },
});

export const { setName, setEmail, setPosition, setAbout } = infoSlice.actions;

export default infoSlice.reducer;
