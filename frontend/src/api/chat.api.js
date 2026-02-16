import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const getAllContacts = createAsyncThunk(
  "chat/getallcontacts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getApi({
        url: "api/message/contacts",
      });
      toast.success(response.message);
      return response?.filteredUsers;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.response.data.originalMessage);
    }
  },
);

export const getMyChatPartners = createAsyncThunk(
  "chat/getmychatpartners",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getApi({
        url: "api/message/chats",
        body: data,
      });

      return response?.chatPartners;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.response.data.originalMessage);
    }
  },
);
