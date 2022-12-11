import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload);
    },
    editTitle: (state, action) => {
      const { id, title } = action.payload;
      const index = state.findIndex((project) => project.id === id);
      state[index].title = title;
    },
    editImage: (state, action) => {
      const { id, image } = action.payload;
      const index = state.findIndex((project) => project.id === id);
      state[index].image = image;
    },
    editDescription: (state, action) => {
      const { id, description } = action.payload;
      const index = state.findIndex((project) => project.id === id);
      state[index].description = description;
    },
    editLink: (state, action) => {
      const { id, link } = action.payload;
      const index = state.findIndex((project) => project.id === id);
      state[index].link = link;
    },
    setProject: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addProject,
  removeProject,
  editTitle,
  editImage,
  editDescription,
  editLink,
  setProject,
} = projectSlice.actions;

export default projectSlice.reducer;
