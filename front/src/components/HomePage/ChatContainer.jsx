import { MessagesSquare } from "lucide-react"
import { useChatStore } from "../../store/useChatStore"

const ChatContainer = () => {
  const {messages} = useChatStore()
   return (
    <div className="col-span-9 p-4 h-full flex flex-col">
      <p className="border-b text-emphasis pb-1">ChatContainer</p>
      <div className="flex-1">
        <div className="h-full flex items-center justify-center gap-2">
          <MessagesSquare />
          <h3 className="text-3h">No Messages Yet</h3>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer