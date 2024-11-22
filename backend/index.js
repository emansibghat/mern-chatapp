import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import { Server } from "socket.io";
import http from "http";

const app = express();

dotenv.config();

app.use(cors({
  origin: ['https://chatapp-mu-roan.vercel.app', "http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use(cookieParser());
app.use("/user", userRoute);
app.use("/message", messageRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://chatapp-mu-roan.vercel.app', "http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
});

const users = new Map();

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  socket.on("sendMessage", ({ message, conversationId }) => {
    const receiverId = message.receiverId;
    const receiverSocketId = users.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        users.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

const getReceiverSocketId = (receiverId) => {
  return users.get(receiverId);
};

export { io, getReceiverSocketId };

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});