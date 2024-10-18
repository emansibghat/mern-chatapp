import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import Cookies from "js-cookie";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const token = Cookies.get("jwt")
      const res = await axios.post(
        `http://localhost:4000/message/send/${selectedConversation._id}`,
        { message }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      }
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;