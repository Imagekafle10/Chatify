import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetailsById,
  loginUser,
  SignupUser,
  updateProfile,
} from "../../api/auth.api";
const initialValues = {
  authUser: null,
  isloading: false,
  isLoggedIn: false,
  isError: false,
  isSigningUp: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    logout: () => {
      return initialValues; // reset state to initial
    },
    login: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignupUser.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isSigningUp = true;
      })
      .addCase(SignupUser.fulfilled, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isSigningUp = false;
      })
      .addCase(SignupUser.rejected, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isSigningUp = false;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isloading = true;
        state.isError = false;
        state.isLoggedIn = false;
      });
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isloading = true;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isloading = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isloading = false;
        state.isError = true;
      });
    builder
      .addCase(getUserDetailsById.pending, (state) => {
        state.isloading = true;
        state.isError = false;
      })
      .addCase(getUserDetailsById.fulfilled, (state, action) => {
        state.isloading = false;
        state.authUser = action.payload;
      })
      .addCase(getUserDetailsById.rejected, (state) => {
        state.isloading = false;
        state.isError = true;
      });
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
