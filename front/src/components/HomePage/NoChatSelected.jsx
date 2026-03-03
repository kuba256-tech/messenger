import { MessagesSquare } from "lucide-react";

const NoChatSelected = () => {
 

  return (
    <div className="col-span-9">
      <div
        className={`h-full flex items-center justify-center gap-2`}
      >
        <MessagesSquare className="animate-bounce" />
        <h3 className="text-3h">No Messages Yet</h3>
      </div>
    </div>
  );
};

export default NoChatSelected;
