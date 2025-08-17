import { create } from 'zustand'

const useChatStore = create(set => ({
  messages: [],
  newMessage: message =>
    set(state => ({
      messages: [...state.messages, { text: message.text, sender: message.sender }],
    })),
  resetMessages: () => set({ messages: [] }),
}))

export default useChatStore
