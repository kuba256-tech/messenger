import React from "react";
import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";
import { Contact } from "lucide-react";
import noPic from "../../assets/noPic.jpg";
import SideBarSkeleton from "../skeletons/SideBarSkeleton";
import { useAuthStore } from "../../store/useAuthStore";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full overflow-y-auto p-3 sm:p-4 md:border-r-2">
      <div className="flex gap-2 border-b pb-1">
        <Contact className="size-5" />
        <p className="text-emphasis">Contacts</p>
      </div>
      <div>
        <div className="py-3 space-y-2">
          {users.map((user) => (
            <div
              onClick={() => setSelectedUser(user)}
              key={user._id}
              className={`flex items-center gap-2 rounded-2xl p-2 transition-all ease-in-out ${selectedUser && user._id === selectedUser._id && "bg-black/20"} cursor-pointer`}
            >
              <div className="relative w-12 sm:w-14">
                <img
                  className="z-2 h-12 w-12 rounded-full sm:h-14 sm:w-14"
                  alt="userImage"
                  src={user.profilePic ? user.profilePic : noPic}
                />
                <div
                  className={` ${onlineUsers.includes(user._id) ? "bg-green-600" : "bg-red-600"}  absolute z-1 right-1 bottom-1 w-2 h-2 rounded-full`}
                ></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-bold font-poppins ">
                  {user.fullName}
                </p>
                <p className="truncate text-small opacity-80">
                  last Message....
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
