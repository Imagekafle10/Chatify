import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const SignupUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      // const response = await postApi({ url: 'api/auth/login', body: data });
      const response = await postApi({
        url: "api/auth/signup",
        body: data,
      });
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.response.data.originalMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      // const response = await postApi({ url: 'api/auth/login', body: data });
      const response = await postApi({
        url: "api/auth/login",
        body: data,
      });
      toast.success("Login successful!!!");
      return response;
    } catch (error) {
      toast.error("Invalid username or password");
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // const response = await postApi({ url: 'api/auth/logout' });
      const response = await postApi({ url: "api/auth/logout" });
      dispatch(logout());
      toast.success("Logout successful");
      return response.data;
    } catch (error) {
      toast.error("Logout Failed");
      return rejectWithValue(error.response.data);
    }
  },
);
