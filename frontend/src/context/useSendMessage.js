import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import Cookies from "js-cookie";
import { useSocketContext } from "./SocketContext";
const REACT_APP_API_URL =process.env.REACT_APP_API_URL  
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, addMessage, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;

    setLoading(true);
    try {
      const token = Cookies.get("jwt");
      const res = await axios.post(
        `${REACT_APP_API_URL}/message/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        }
      );

      addMessage(res.data);

      if (socket) {
        socket.emit("sendMessage", {
          message: res.data,
          conversationId: selectedConversation._id
        });
      }

      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
      throw error;
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
