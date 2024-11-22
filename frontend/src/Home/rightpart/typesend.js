import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const [showPicker, setShowPicker] = useState(false); // Toggle emoji picker

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty messages
    await sendMessages(message);
    setMessage("");
  };

  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-1 h-[8vh] bg-gray-800 relative">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="text-xl px-2"
          >
            😊
          </button>
          {showPicker && (
            <div className="absolute bottom-12 left-0 z-50">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
        </div>
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
          />
        </div>
        <button type="submit" disabled={loading} className="text-gray-400">
          <IoSend className={`text-3xl ${loading ? "animate-pulse" : ""}`} />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
