import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    set => ({
      username: '',
      setUsername: name => set(state => ({ username: name })),
    }),
    {
      name: 'username',
      getStorage: () => localStorage,
    }
  )
)

export default useUserStore
