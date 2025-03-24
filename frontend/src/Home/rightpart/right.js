import React, { useEffect } from "react";
import Chatuser from "./chatuser";
import Messages from "./messages";
import Typesend from "./typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.js";
import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const handleGroupChatRedirect = () => {
    navigate("/groupchat"); // Navigate to the Group Chat page
  };

  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex flex-col h-screen items-center justify-center space-y-4">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.fullname}
            </span>
            <br />
            No chat selected, please start a conversation by selecting anyone
            from your contacts
          </h1>
          {/* Group Chat Button */}
          <button
            onClick={handleGroupChatRedirect}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Go to Group Chat
          </button>
        </div>
      </div>
    </>
  );
};
