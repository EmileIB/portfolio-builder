import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./infoSlice";
import educationReducer from "./educationSlice";
import experienceReducer from "./experienceSlice";

export const store = configureStore({
  reducer: {
    info: infoReducer,
    education: educationReducer,
    experience: experienceReducer,
  },
});
