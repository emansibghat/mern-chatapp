import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    // Handle new incoming messages
    const handleNewMessage = (data) => {
      // Check if the message belongs to the currently selected conversation
      if (selectedConversation?._id === data.conversationId) {
        // Update state with the new message
        setMessage((prevMessages) => [...prevMessages, data.message]);
      }
    };

    // Listen for new messages
    socket.on("newMessage", handleNewMessage);

    // Cleanup the listener on component unmount
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation, setMessage]);
};

export default useGetSocketMessage;
