import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state, action) => {
      state.push(action.payload);
    },
    removeExperience: (state, action) => {
      return state.filter((experience) => experience._id !== action.payload);
    },
    editCompany: (state, action) => {
      const { _id, company } = action.payload;
      const index = state.findIndex((experience) => experience._id === _id);
      state[index].company = company;
    },
    editPosition: (state, action) => {
      const { _id, position } = action.payload;
      const index = state.findIndex((experience) => experience._id === _id);
      state[index].position = position;
    },
    editStart: (state, action) => {
      const { _id, start } = action.payload;
      const index = state.findIndex((experience) => experience._id === _id);
      state[index].start = start;
    },
    editEnd: (state, action) => {
      const { _id, end } = action.payload;
      const index = state.findIndex((experience) => experience._id === _id);
      state[index].end = end;
    },
    editDescription: (state, action) => {
      const { _id, description } = action.payload;
      const index = state.findIndex((experience) => experience._id === _id);
      state[index].description = description;
    },
    setExperience: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addExperience,
  removeExperience,
  editCompany,
  editPosition,
  editStart,
  editEnd,
  editDescription,
  setExperience,
} = experienceSlice.actions;

export default experienceSlice.reducer;
