import React, { useState } from "react";
import { useSocketContext } from "./SocketProvider";

const DirectChat = () => {
  const { onlineUsers, sendDirectMessage, directMessages } = useSocketContext();
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const handleSend = () => {
    if (receiverId && message) {
      sendDirectMessage(receiverId, message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div>
      <h2>Direct Chat</h2>
      <select onChange={(e) => setReceiverId(e.target.value)}>
        <option value="">Select User</option>
        {onlineUsers.map((userId) => (
          <option key={userId} value={userId}>
            {userId}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>

      <div>
        <h3>Messages</h3>
        {directMessages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectChat;
