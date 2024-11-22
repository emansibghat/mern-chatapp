import { getReceiverSocketId, io } from "../index.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const populatedMessage = await Message.findById(newMessage._id);

    res.status(200).json(populatedMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query; 
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await user.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("Error searching user by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};