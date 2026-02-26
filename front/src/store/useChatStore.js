import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isMessagesLoading: false,
  isUserLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log("error oin getUser", error.response.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/:${userId}`);
    } catch (error) {
      console.log("error in getMessages", error.response.messages);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser:async(selectedUser)=>{
    set({selectedUser})
  }
}));
