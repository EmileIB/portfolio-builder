import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      return state.filter((project) => project._id !== action.payload);
    },
    editTitle: (state, action) => {
      const { _id, title } = action.payload;
      const index = state.findIndex((project) => project._id === _id);
      state[index].title = title;
    },
    editImage: (state, action) => {
      const { _id, image } = action.payload;
      const index = state.findIndex((project) => project._id === _id);
      state[index].image = image;
    },
    editDescription: (state, action) => {
      const { _id, description } = action.payload;
      const index = state.findIndex((project) => project._id === _id);
      state[index].description = description;
    },
    editLink: (state, action) => {
      const { _id, link } = action.payload;
      const index = state.findIndex((project) => project._id === _id);
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
} = projectsSlice.actions;

export default projectsSlice.reducer;
