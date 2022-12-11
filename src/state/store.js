import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./infoSlice";
import educationReducer from "./educationSlice";

export const store = configureStore({
  reducer: {
    info: infoReducer,
    education: educationReducer,
  },
});
