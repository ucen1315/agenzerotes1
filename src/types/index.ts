// Re-export all types
export type { User, Transaction, Asset, MarketData } from './index';
// Define types here or in separate files
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  currency: string;
  date: Date;
}

export interface Asset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
}
