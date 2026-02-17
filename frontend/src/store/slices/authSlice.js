import { createSlice } from "@reduxjs/toolkit";
import {
  connectSocket,
  disconnectSocket,
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
  onlineUsers: [],
  socket: false,
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
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
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
    builder
      .addCase(connectSocket.pending, (state) => {
        state.socket = false;
      })
      .addCase(connectSocket.fulfilled, (state) => {
        state.socket = true;
      })
      .addCase(connectSocket.rejected, (state) => {
        state.socket = false;
      })

      .addCase(disconnectSocket.fulfilled, (state) => {
        state.socket = false;
        state.onlineUsers = [];
      });
  },
});

export const { logout, login, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
