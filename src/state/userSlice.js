import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  isLoading: false,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profilePic: {
    name: "",
    displayName: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      action.payload.isLoading = false;
      return action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setProfilePic,
  setUser,
  setSignedIn,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
