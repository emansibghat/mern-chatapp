import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import Cookies from "js-cookie"
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const token = Cookies.get("jwt")
          const res = await axios.get(
            `http://localhost:4000/message/get/${selectedConversation._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
              withCredentials: true,
            }
          );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;