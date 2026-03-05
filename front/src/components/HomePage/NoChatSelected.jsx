import { MessagesSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="h-full">
      <div className="h-full flex items-center justify-center gap-2 px-4 text-center">
        <MessagesSquare className="animate-bounce" />
        <h3 className="text-h3">No Messages Yet</h3>
      </div>
    </div>
  );
};

export default NoChatSelected;
