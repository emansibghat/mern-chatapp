import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};
const groups = {}; // Store groups and their members

// Handle joining a group
socket.on("joinGroup", (groupName) => {
  socket.join(groupName);
  if (!groups[groupName]) groups[groupName] = [];
  groups[groupName].push(socket.id);
  io.to(groupName).emit("groupMessage", { senderId: socket.id, message: `${socket.id} has joined the group.` });
});

// Handle sending a message to the group
socket.on("sendGroupMessage", ({ groupName, senderId, message }) => {
  io.to(groupName).emit("groupMessage", { groupName, senderId, message });
});

const users = {};

// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  // used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users));

  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };