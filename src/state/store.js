import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./infoSlice";
import educationReducer from "./educationSlice";
import experienceReducer from "./experienceSlice";
import projectsReducer from "./projectSlice";
import userReducer from "./userSlice";
import globalReducer from "./globalSlice";

export const store = configureStore({
  reducer: {
    info: infoReducer,
    education: educationReducer,
    experience: experienceReducer,
    projects: projectsReducer,
    user: userReducer,
    global: globalReducer,
  },
});
