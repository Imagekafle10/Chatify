import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import {
  addOptimisticMessage,
  removeOptimisticMessage,
} from "../store/slices/chatStoreSlice";

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

export const getMessageByUserID = createAsyncThunk(
  "chat/getMessageByUserID",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getApi({
        url: `api/message/${data}`,
        body: data,
      });

      return response?.messages;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.response.data.originalMessage);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data, { dispatch, rejectWithValue, getState }) => {
    const { selectedUser, messages } = getState().chat;
    const { authUser } = getState().auth;
    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      id: tempId,
      senderId: authUser.id,
      receiverId: selectedUser.id,
      text: messages.text,
      image: messages.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // optional flag
    };
    dispatch(addOptimisticMessage(optimisticMessage));
    try {
      const response = await postApi({
        url: `api/message/send/${selectedUser.id}`,
        body: data,
        contentType: "multipart/form-data",
      });

      return response;
    } catch (error) {
      dispatch(removeOptimisticMessage(tempId));
      toast.error(error);
      return rejectWithValue(error.response.data.originalMessage);
    }
  },
);
