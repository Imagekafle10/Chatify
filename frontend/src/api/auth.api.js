import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi, putApi } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { createSocket, disconnectSocketInstance } from "../utils/socket";
import { setOnlineUsers } from "../store/slices/authSlice";

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
      await dispatch(getUserDetailsById()).unwrap();
      dispatch(connectSocket());
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
      dispatch(disconnectSocket());
      toast.success("Logout successful");
      return response.data;
    } catch (error) {
      toast.error("Logout Failed");
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateprofile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await putApi({
        url: "api/auth/updateprofile",
        body: data,
        contentType: "multipart/form-data",
      });
      await dispatch(getUserDetailsById()).unwrap();
      toast.success("Profile Update successful!!!");
      return response;
    } catch (error) {
      toast.error("Update Unsuccessful!!!");
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserDetailsById = createAsyncThunk(
  "auth/getuserdetailsbyid",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getApi({
        url: "api/auth/me",
      });
      // console.log(response);

      // dispatch(getUserPermission(response.user_id)).unwrap().then(res => {
      //     localStorage.setItem('permission', JSON.stringify(res.permission));
      // });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const connectSocket = createAsyncThunk(
  "auth/connectSocket",
  async (_, { getState, dispatch }) => {
    const { authUser } = getState().auth;

    if (!authUser) return;
    console.log(authUser);

    const socket = createSocket();

    socket.connect();

    // listen event
    socket.on("getOnlineUsers", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });

    return true;
  },
);

export const disconnectSocket = createAsyncThunk(
  "auth/disconnectSocket",
  async () => {
    disconnectSocketInstance();
    return true;
  },
);
