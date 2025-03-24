import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // user: { type: String, required: true },
    // text: { type: String, required: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;