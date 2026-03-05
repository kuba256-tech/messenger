import React from "react";
import { useEffect } from "react";
import SideBar from "../components/HomePage/SideBar";
import ChatContainer from "../components/HomePage/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/HomePage/NoChatSelected";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setSelectedUser(null);
    }
  }, [setSelectedUser]);

  return (
    <div className="h-[calc(100dvh-4rem)] overflow-hidden p-2 sm:p-4">
      <div className="mx-auto h-full w-full max-w-6xl overflow-hidden rounded-2xl bg-black/50 md:grid md:grid-cols-12">
        <div
          className={`${
            selectedUser
              ? "hidden md:block md:col-span-4 lg:col-span-3"
              : "block md:col-span-4 lg:col-span-3"
          } h-full`}
        >
          <SideBar />
        </div>
        <div
          className={`${
            selectedUser
              ? "block md:col-span-8 lg:col-span-9"
              : "hidden md:block md:col-span-8 lg:col-span-9"
          } h-full`}
        >
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

/*
const file = e.targer.files[0]
if(file.type.startsWith("image/*")){
const reader = fileReader
reader.onloaden(()=>{
    setImage(file.result)})
}

 */

export default HomePage;
