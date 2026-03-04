import React from "react";
import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";
import { Contact } from "lucide-react";
import noPic from "../../assets/noPic.jpg"
import SideBarSkeleton from "../skeletons/SideBarSkeleton";
import { useAuthStore } from "../../store/useAuthStore";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

    const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if(isUsersLoading)return <SideBarSkeleton/>

  
  return (
    <aside className="col-span-3 border-r-2 p-4 h-full overflow-y-auto">
      <div className="flex gap-2 border-b pb-1">
        <Contact size={"10%"}/> 
        <p className="text-emphasis">Contacts</p>
      </div>
      <div>
        <div className="py-3 space-y-2">
          {users.map((user) => (
            <div 
            onClick={()=>setSelectedUser(user)}
            key={user._id} className={`flex p-1 gap-2 items-center ${selectedUser && user._id === selectedUser._id && "bg-black/20"} transition-all ease-in-out rounded-2xl cursor-pointer`} >
              <div className="w-15 relative">
                <img
                  className="z-2 w-15 h-15  rounded-full"
                  alt="userImage"
                  src={user.profilePic? user.profilePic : noPic}
                />
                <div className={` ${onlineUsers.includes(user._id) ?"bg-green-600":"bg-red-600" }  absolute z-1 right-1 bottom-1 w-2 h-2 rounded-full`}></div>
              </div>
              <div>
                <p className="text-bold font-poppins ">{user.fullName}</p>
                <p>last Message....</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
