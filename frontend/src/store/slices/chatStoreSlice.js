import { createSlice } from "@reduxjs/toolkit";
import {
  getAllContacts,
  getMessageByUserID,
  getMyChatPartners,
} from "../../api/chat.api";

const initialValues = {
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isError: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialValues,
  reducers: {
    toggleSound: (state) => {
      state.isSoundEnabled = !state.isSoundEnabled;
      localStorage.setItem("isSoundEnabled", state.isSoundEnabled);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.isUsersLoading = true;
        state.allContacts = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.allContacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state) => {
        state.isUsersLoading = false;
        state.allContacts = null;
      });

    builder
      .addCase(getMyChatPartners.pending, (state) => {
        state.isUsersLoading = true;
        state.chats = null;
      })
      .addCase(getMyChatPartners.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.chats = action.payload;
      })
      .addCase(getMyChatPartners.rejected, (state) => {
        state.isUsersLoading = false;
        state.chats = null;
      });
    builder
      .addCase(getMessageByUserID.pending, (state) => {
        state.isMessagesLoading = true;
        state.messages = null;
      })
      .addCase(getMessageByUserID.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessageByUserID.rejected, (state) => {
        state.isMessagesLoading = false;
        state.messages = null;
      });
  },
});

export const { toggleSound, setActiveTab, setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
