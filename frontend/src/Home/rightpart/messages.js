import React, { useEffect, useRef } from "react";
import Message from './message';
import useGetMessage from '../../context/useGetMessage';
import Loading from "../../components/Loading.js";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();
  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
        <Loading />
      </div>
    );
  }

  const messageArray = Array.isArray(messages) ? messages : [];

  if (messageArray.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
        <p className="text-center mt-[20%]">
          Say! Hi to start the conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
      {messageArray.map((message, index) => (
        <div
          key={message._id || index}
          ref={index === messageArray.length - 1 ? lastMsgRef : null}
        >
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}

export default Messages;