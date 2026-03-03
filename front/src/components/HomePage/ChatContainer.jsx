import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import ChatInputMessage from "./ChatInputMessage";
import ChatTop from "./ChatTop";
import noPic from "../../assets/noPic.jpg";
const ChatContainer = () => {
  const { messages, selectedUser, getMessages } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser]);

  return (
    <div className="col-span-9 p-4 h-full flex flex-col">
      <ChatTop />
      <div className="h-full">
        {messages.map((message) => (
          <div key={message._id}>
            <div
              className={`chat ${message.senderId === authUser._id ?  "chat-end": "chat-start"}`}
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
                  className="sm:max-w-[100px] rounded-md mb-2"
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
