import noPic from "../../assets/noPic.jpg";
import { useChatStore } from "../../store/useChatStore";
import { ArrowLeft } from "lucide-react";

const ChatTop = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return;
  return (
    <div className="mb-2 border-b pb-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Back to contacts"
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm px-2 md:hidden"
        >
          <ArrowLeft className="size-4" />
        </button>
        <img
          className="z-2 w-10 h-10 rounded-full"
          alt="userImage"
          src={selectedUser.profilePic ? selectedUser.profilePic : noPic}
        />
        <div className="min-w-0">
          <p className="text-emphasis truncate">{selectedUser.fullName}</p>
          <p className="text-small font-poppins text-slate-100">Offline</p>
        </div>
      </div>
    </div>
  );
};

export default ChatTop;
