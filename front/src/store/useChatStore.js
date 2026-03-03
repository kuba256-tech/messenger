import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isMessagesLoading: false,
  isUsersLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("error oin getUser", error.response.messages);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({messages:res.data})
    } catch (error) {
      toast.error("error in getMessages", error.response.messages);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },

  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
        toast.error(error.response.data.message)
    } finally {

    }
  },
}));
