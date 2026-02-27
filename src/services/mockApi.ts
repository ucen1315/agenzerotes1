import { Asset, PortfolioAsset, Transaction, ApiKey, SecuritySettings } from '../types'

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock market data
export const mockAssets: Asset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 67234.50, change24h: 2.34, marketCap: 1320000000000, volume24h: 28500000000 },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3456.78, change24h: -1.23, marketCap: 415000000000, volume24h: 15200000000 },
  { id: '3', symbol: 'SOL', name: 'Solana', price: 178.90, change24h: 5.67, marketCap: 78000000000, volume24h: 3200000000 },
  { id: '4', symbol: 'XRP', name: 'Ripple', price: 0.6234, change24h: -0.45, marketCap: 34000000000, volume24h: 1200000000 },
  { id: '5', symbol: 'ADA', name: 'Cardano', price: 0.5890, change24h: 1.89, marketCap: 21000000000, volume24h: 450000000 },
  { id: '6', symbol: 'DOGE', name: 'Dogecoin', price: 0.1567, change24h: 8.45, marketCap: 22500000000, volume24h: 1800000000 },
  { id: '7', symbol: 'DOT', name: 'Polkadot', price: 8.45, change24h: -2.34, marketCap: 11000000000, volume24h: 320000000 },
  { id: '8', symbol: 'AVAX', name: 'Avalanche', price: 42.34, change24h: 3.21, marketCap: 16000000000, volume24h: 580000000 },
]

// Mock portfolio data
export const mockPortfolio: PortfolioAsset[] = [
  { ...mockAssets[0], holdings: 1.5, value: 100851.75, allocation: 80.4 },
  { ...mockAssets[1], holdings: 5.2, value: 17975.26, allocation: 14.3 },
  { ...mockAssets[2], holdings: 15.0, value: 2683.50, allocation: 2.1 },
  { ...mockAssets[3], holdings: 5000, value: 3117.00, allocation: 2.5 },
  { ...mockAssets[4], holdings: 2000, value: 1178.00, allocation: 0.7 },
]

// Mock transactions
export const mockTransactions: Transaction[] = [
  { id: '1', type: 'buy', asset: 'BTC', amount: 0.5, price: 66500, total: 33250, timestamp: new Date('2024-02-26T10:30:00'), status: 'completed' },
  { id: '2', type: 'sell', asset: 'ETH', amount: 2.0, price: 3520, total: 7040, timestamp: new Date('2024-02-25T14:15:00'), status: 'completed' },
  { id: '3', type: 'buy', asset: 'SOL', amount: 10, price: 172, total: 1720, timestamp: new Date('2024-02-24T09:45:00'), status: 'completed' },
  { id: '4', type: 'transfer', asset: 'USDT', amount: 5000, price: 1, total: 5000, timestamp: new Date('2024-02-23T16:20:00'), status: 'completed' },
  { id: '5', type: 'buy', asset: 'DOGE', amount: 10000, price: 0.145, total: 1450, timestamp: new Date('2024-02-22T11:00:00'), status: 'pending' },
]

// Mock API keys
export const mockApiKeys: ApiKey[] = [
  { id: '1', name: 'Binance API', key: 'pk_live_*********************', permissions: ['read', 'trade'], createdAt: new Date('2024-01-15'), lastUsed: new Date('2024-02-26'), isActive: true },
  { id: '2', name: 'Coinbase Pro', key: 'pk_live_*********************', permissions: ['read'], createdAt: new Date('2024-02-01'), lastUsed: new Date('2024-02-20'), isActive: true },
  { id: '3', name: 'Kraken API', key: 'pk_live_*********************', permissions: ['read', 'trade', 'withdraw'], createdAt: new Date('2023-12-10'), isActive: false },
]

// Mock security settings
export const mockSecuritySettings: SecuritySettings = {
  twoFactorEnabled: true,
  emailNotifications: true,
  loginAlerts: true,
  withdrawalWhitelist: ['0x742d35Cc6634C0532925a3b844Bc9e7595f8bE7d'],
}

// API Service Functions
export const apiService = {
  // Get all assets
  getAssets: async (): Promise<Asset[]> => {
    await delay(500)
    return mockAssets
  },

  // Get portfolio
  getPortfolio: async (): Promise<PortfolioAsset[]> => {
    await delay(600)
    return mockPortfolio
  },

  // Get transactions
  getTransactions: async (): Promise<Transaction[]> => {
    await delay(400)
    return mockTransactions
  },

  // Get API keys
  getApiKeys: async (): Promise<ApiKey[]> => {
    await delay(300)
    return mockApiKeys
  },

  // Get security settings
  getSecuritySettings: async (): Promise<SecuritySettings> => {
    await delay(300)
    return mockSecuritySettings
  },

  // Create API key
  createApiKey: async (name: string, permissions: string[]): Promise<ApiKey> => {
    await delay(500)
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name,
      key: `pk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions,
      createdAt: new Date(),
      isActive: true,
    }
    mockApiKeys.push(newKey)
    return newKey
  },

  // Delete API key
  deleteApiKey: async (id: string): Promise<void> => {
    await delay(300)
    const index = mockApiKeys.findIndex(k => k.id === id)
    if (index > -1) {
      mockApiKeys.splice(index, 1)
    }
  },

  // Update security settings
  updateSecuritySettings: async (settings: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    await delay(400)
    Object.assign(mockSecuritySettings, settings)
    return mockSecuritySettings
  },
}
