import { create } from 'zustand'
import { User, Wallet, AppState } from '../types'

interface AppStore extends AppState {
  setUser: (user: User | null) => void
  setWallet: (wallet: Wallet | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setCurrentPage: (page: string) => void
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  wallet: null,
  isAuthenticated: false,
  currentPage: 'dashboard',
  
  setUser: (user) => set({ user }),
  setWallet: (wallet) => set({ wallet }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  
  connectWallet: async () => {
    // Simulate wallet connection
    const mockWallet: Wallet = {
      id: 'wallet-1',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE7d',
      balance: 125430.50,
      network: 'Ethereum',
      isConnected: true,
    }
    set({ wallet: mockWallet })
  },
  
  disconnectWallet: () => {
    set({ wallet: null })
  },
  
  login: async (email: string, password: string) => {
    // Simulate login
    const mockUser: User = {
      id: 'user-1',
      email,
      name: 'Crypto Trader',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto',
      isVerified: true,
    }
    set({ user: mockUser, isAuthenticated: true })
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, wallet: null })
  },
}))
