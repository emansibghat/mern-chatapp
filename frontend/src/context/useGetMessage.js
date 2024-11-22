import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import Cookies from "js-cookie";
import { useSocketContext } from "./SocketContext";
const REACT_APP_API_URL =process.env.REACT_APP_API_URL
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const fetchMessages = async () => {
    if (!selectedConversation?._id) {
      setMessage([]);
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("jwt");
      const res = await axios.get(
        `${REACT_APP_API_URL}/message/get/${selectedConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        }
      );

      const messageArray = Array.isArray(res.data) ? res.data : [];
      setMessage(messageArray);
    } catch (error) {
      console.log("Error in getting messages", error);
      setMessage([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation?._id]);

  return {
    loading,
    messages: Array.isArray(messages) ? messages : []
  };
};

export default useGetMessage;
