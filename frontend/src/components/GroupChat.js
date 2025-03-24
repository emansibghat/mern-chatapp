import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.js";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth(); // Get the authenticated user
  const groupId = "123"; // Replace with dynamic group ID if needed
  const authToken = localStorage.getItem("token"); // Replace with your token management logic

  // Fetch messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/messages/get/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [groupId, authToken]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        user: authUser.fullname,
        text: newMessage,
      };

      await axios.post(
        `http://localhost:4000/api/messages/send/${groupId}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, time: new Date() },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-gray-300">
      <header className="p-4 bg-gray-900 text-white text-lg font-bold">
        Group Chat
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                msg.user === authUser.fullname
                  ? "bg-blue-600 self-end"
                  : "bg-gray-700 self-start"
              }`}
            >
              <p className="text-sm font-semibold">{msg.user}</p>
              <p>{msg.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(msg.time).toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </div>
      <div className="p-4 bg-gray-900">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-l bg-gray-700 text-white border-none outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
