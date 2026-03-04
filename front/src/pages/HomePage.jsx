import React from "react";
import SideBar from "../components/HomePage/SideBar";
import ChatContainer from "../components/HomePage/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/HomePage/NoChatSelected";
import { useEffect } from "react";


const HomePage = () => {
    const {selectedUser} = useChatStore()

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden flex justify-center p-4">
      <div className="w-[70%] h-full grid grid-cols-12 rounded-2xl bg-black/50 overflow-hidden">
        <SideBar />
        {selectedUser ?  <ChatContainer/>: <NoChatSelected/>}
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
