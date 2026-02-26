import React from "react";
import SideBar from "../components/HomePage/SideBar";
import ChatContainer from "../components/HomePage/ChatContainer";

const HomePage = () => {
  return (
    <div className="flex justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-[70%] bg-black/30 my-12 grid grid-cols-12 rounded-2xl">
        <SideBar />
        <ChatContainer/>
      </div>
    </div>
  );
};

export default HomePage;
