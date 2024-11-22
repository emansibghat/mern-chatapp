import React, { useState } from "react";
import { useSocketContext } from "./SocketProvider";

const GroupChat = () => {
  const { joinGroup, sendGroupMessage, groupMessages } = useSocketContext();
  const [message, setMessage] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleJoinGroup = () => {
    if (groupName) {
      joinGroup(groupName);
    }
  };

  const handleSendGroupMessage = () => {
    if (groupName && message) {
      sendGroupMessage(groupName, message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div>
      <h2>Group Chat</h2>

      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleJoinGroup}>Join Group</button>

      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendGroupMessage}>Send</button>

      <div>
        <h3>Group Messages in {groupName}</h3>
        {groupMessages
          .filter((msg) => msg.groupName === groupName)
          .map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderId}:</strong> {msg.message}
            </div>
          ))}
      </div>
    </div>
  );
};

export default GroupChat;
