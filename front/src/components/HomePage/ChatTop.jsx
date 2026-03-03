import noPic from "../../assets/noPic.jpg";
import { useChatStore } from "../../store/useChatStore";

const ChatTop = () => {
    const {selectedUser} = useChatStore()

    if(!selectedUser)return
  return (
    <div className="border-b">
      <div className="w-10 gap-2 flex items-center">
        <img
          className="z-2 w-10 h-10 rounded-full"
          alt="userImage"
          src={selectedUser.profilePic ? selectedUser.profilePic : noPic}
        />
        <div>
          <p className="text-emphasis ">{selectedUser.fullName}</p>
          <p className="text-small font-poppins text-slate-100">Offline</p>
        </div>
      </div>
    </div>
  );
};

export default ChatTop;
