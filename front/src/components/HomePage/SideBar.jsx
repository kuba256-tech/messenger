import React from "react";
import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";
import { Contact } from "lucide-react";
import SideBarSkeletons from "./SideBarSkeletons";
import noPic from "../../assets/noPic.jpg"

const SideBar = () => {
  const { getUsers, users, selectedUser, SetSelectedUser, isUserLoading } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);
  return (
    <aside className="col-span-3 border-r-2 p-4">
      <div className="flex gap-2 border-b pb-1">
        <Contact size={"10%"}/> 
        <p className="text-emphasis">Contacts</p>
      </div>
      <div>
        <div className="py-3 space-y-3">
          {users.map((user) => (
            <div className="flex gap-2 items-center">
              <div className="w-15 relative">
                <img
                  className="z-2 w-15 h-15  rounded-full "
                  src={user.profilePic? user.profilePic : noPic}
                />
                <div className="bg-green-600  absolute z-1 right-1 bottom-1 w-2 h-2 rounded-full"></div>
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
