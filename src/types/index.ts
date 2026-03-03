export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  balance?: number;
  value?: number;
  marketCap?: number;
  volume24h?: number;
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  balance?: number;
  price: number;
  value: number;
  allocation: number;
  change24h: number;
  holdings?: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'receive' | 'send' | 'swap' | 'transfer';
  asset: string;
  amount: number;
  value?: number;
  total: number;
  price?: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: number | Date;
  from?: string;
  to?: string;
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: number | Date;
  lastUsed?: number | Date;
  isActive?: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  lastPasswordChange?: number;
  loginNotifications: boolean;
  emailNotifications?: boolean;
  loginAlerts?: boolean;
  withdrawalWhitelist?: string[];
}
