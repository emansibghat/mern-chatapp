import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation, messages: [] }), 
  messages: [],
  setMessage: (messages) => set({ 
    messages: Array.isArray(messages) ? messages : [] 
  }),
  addMessage: (message) => set((state) => ({
    messages: [...(Array.isArray(state.messages) ? state.messages : []), message]
  })),
}));

export default useConversation;