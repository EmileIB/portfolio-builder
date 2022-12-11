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
      return state.filter((experience) => experience.id !== action.payload);
    },
    editCompany: (state, action) => {
      const { id, company } = action.payload;
      const index = state.findIndex((experience) => experience.id === id);
      state[index].company = company;
    },
    editPosition: (state, action) => {
      const { id, position } = action.payload;
      const index = state.findIndex((experience) => experience.id === id);
      state[index].position = position;
    },
    editStart: (state, action) => {
      const { id, start } = action.payload;
      const index = state.findIndex((experience) => experience.id === id);
      state[index].start = start;
    },
    editEnd: (state, action) => {
      const { id, end } = action.payload;
      const index = state.findIndex((experience) => experience.id === id);
      state[index].end = end;
    },
    editDescription: (state, action) => {
      const { id, description } = action.payload;
      const index = state.findIndex((experience) => experience.id === id);
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
