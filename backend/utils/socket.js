// server.js
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const { REACT_APP_URL } = require("./constant.js");
const {
  socketAuthMiddleware,
} = require("../middleware/socket.auth.middleware.js");

const app = express();
const server = http.createServer(app);

// Store online users
const userSocketMap = {}; // { userId: socketId }

const io = new Server(server, {
  cors: {
    origin: [REACT_APP_URL],
    credentials: true, // needed to send cookies
  },
});

// Apply authentication middleware
io.use(socketAuthMiddleware);

// Utility to get socketId of a user
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.user.fullName, socket.user.id);

  const userId = socket.user.id;
  userSocketMap[userId] = socket.id;

  // Broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user.fullName, socket.user.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
