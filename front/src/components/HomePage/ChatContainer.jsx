import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import ChatInputMessage from "./ChatInputMessage";
import ChatTop from "./ChatTop";
import noPic from "../../assets/noPic.jpg";
const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col min-h-0 p-2 sm:p-4">
      <ChatTop />
      <div className="flex-1 min-h-0 overflow-y-auto">
        {messages.map((message) => (
          <div ref={messageEndRef} key={message._id}>
            <div
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || noPic
                        : selectedUser.profilePic || noPic
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="mb-2 max-w-30 rounded-md sm:max-w-45"
                  />
                )}

                {message.text && message.text}
              </div>

              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </div>
        ))}
      </div>
      <ChatInputMessage />
    </div>
  );
};

export default ChatContainer;
