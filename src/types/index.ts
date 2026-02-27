export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isVerified: boolean
}

export interface Wallet {
  id: string
  address: string
  balance: number
  network: string
  isConnected: boolean
}

export interface Asset {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  image?: string
}

export interface PortfolioAsset extends Asset {
  holdings: number
  value: number
  allocation: number
}

export interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'transfer'
  asset: string
  amount: number
  price: number
  total: number
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
}

export interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  createdAt: Date
  lastUsed?: Date
  isActive: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  emailNotifications: boolean
  loginAlerts: boolean
  withdrawalWhitelist: string[]
}

export interface AppState {
  user: User | null
  wallet: Wallet | null
  isAuthenticated: boolean
  currentPage: string
}
