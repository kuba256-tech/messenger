import { ImageUp, Send, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";

const ChatInputMessage = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();

  const selectImgRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    setImagePreview(null);
    if (selectImgRef.current) selectImgRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (selectImgRef.current) selectImgRef.current.value = "";
    } catch (error) {
      console.log("Failed to send Messages:", error);
    }
  };

  return (
    <div className="w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              className="object-top w-20 h-20 object-cover rounded-2xl border-zinc-700 border"
              src={imagePreview}
              alt="previewPic"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 text-red-600 bg-white rounded-3xl"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="relative pt-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 rounded-xl border px-3 py-1 sm:px-4">
            <label htmlFor="messageText">
              <input
                value={text}
                className="w-full border-0 bg-transparent outline-0"
                type="text"
                id="messageText"
                placeholder="text"
                onChange={(e) => setText(e.target.value)}
              />
            </label>
          </div>
          <div>
            <input
              type="file"
              ref={selectImgRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              onClick={() => selectImgRef.current.click()}
              className="btn btn-ghost btn-sm cursor-pointer px-2"
              type="button"
            >
              <ImageUp className="size-5" />
            </button>
          </div>
          <button type="submit" className="btn btn-sm cursor-pointer px-2">
            <Send className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInputMessage;
