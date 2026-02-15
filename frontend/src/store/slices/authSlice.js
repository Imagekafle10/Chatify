import { createSlice } from "@reduxjs/toolkit";
import { loginUser, SignupUser } from "../../api/auth.api";
const initialValues = {
  authUser: { name: "Jhon", id: 123, age: 25 },
  isloading: false,
  isLoggedIn: true,
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
      console.log("Reducer updated:", state.isLoggedIn);
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
    // builder
    //   .addCase(loginUser.pending, (state) => {
    //     state.isloading = true;
    //     state.isError = false;
    //     state.isLoggedIn = false;
    //   })
    //   .addCase(loginUser.fulfilled, (state) => {
    //     state.isloading = true;
    //     state.isError = false;
    //     state.isLoggedIn = false;
    //   })
    //   .addCase(loginUser.rejected, (state) => {
    //     state.isloading = true;
    //     state.isError = false;
    //     state.isLoggedIn = false;
    //   });
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
