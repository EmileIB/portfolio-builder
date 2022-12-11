import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state, action) => {
      state.push(action.payload);
    },
    removeEducation: (state, action) => {
      return state.filter((education) => education.id !== action.payload);
    },
    editSchool: (state, action) => {
      const { id, school } = action.payload;
      const index = state.findIndex((education) => education.id === id);
      state[index].school = school;
    },
    editDegree: (state, action) => {
      const { id, degree } = action.payload;
      const index = state.findIndex((education) => education.id === id);
      state[index].degree = degree;
    },
    editStart: (state, action) => {
      const { id, start } = action.payload;
      const index = state.findIndex((education) => education.id === id);
      state[index].start = start;
    },
    editEnd: (state, action) => {
      const { id, end } = action.payload;
      const index = state.findIndex((education) => education.id === id);
      state[index].end = end;
    },
    editDescription: (state, action) => {
      const { id, description } = action.payload;
      const index = state.findIndex((education) => education.id === id);
      state[index].description = description;
    },
    setEducation: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addEducation,
  removeEducation,
  editSchool,
  editDegree,
  editStart,
  editEnd,
  editDescription,
  setEducation,
} = educationSlice.actions;

export default educationSlice.reducer;
