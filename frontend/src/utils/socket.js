import { io } from "socket.io-client";
import { BASE_URL } from "../constant/common";

let socket = null;

export const createSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      withCredentials: true,
      // auth: {
      //   token: token,
      // },
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocketInstance = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
