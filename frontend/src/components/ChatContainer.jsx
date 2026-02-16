import { useEffect, useRef } from "react";

import { Avatar, Skeleton } from "antd";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useSelector(state=>state.chat)
  const { authUser } = useSelector(state=>state.auth)
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-6 bg-slate-900/50 backdrop-blur-sm">
        {isMessagesLoading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;
              return (
                <div
                  key={msg._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-xs break-words ${
                      isMe ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg max-h-48 object-cover mb-2"
                      />
                    )}
                    {msg.text && <p>{msg.text}</p>}
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      <div className="border-t border-slate-700">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
