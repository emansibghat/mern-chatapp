import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";

const app = express();
dotenv.config();
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.mongodb_uri;

try {
  mongoose.connect(MONGODB_URI);
  console.log("connected to mongodb");
} catch (error) {
  console.log(error);
}

app.use("/user", userRoute);
app.use("/message", messageRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});