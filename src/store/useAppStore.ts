import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  isAuthenticated: boolean
  user: {
    email: string
    name: string
  } | null
  wallet: string | null
  currentPage: string
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  connectWallet: (address: string) => void
  disconnectWallet: () => void
  setCurrentPage: (page: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      wallet: null,
      currentPage: 'dashboard',
      login: async (email: string, _password: string) => {
        // Mock login - in production, this would call an API
        set({
          isAuthenticated: true,
          user: {
            email,
            name: email.split('@')[0],
          },
        })
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          wallet: null,
        })
      },
      connectWallet: (address: string) => {
        set({ wallet: address })
      },
      disconnectWallet: () => {
        set({ wallet: null })
      },
      setCurrentPage: (page: string) => {
        set({ currentPage: page })
      },
    }),
    {
      name: 'decrypt-storage',
    }
  )
)
