import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface MarketData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

const mockMarketData: MarketData[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67234.50,
    change24h: 2.34,
    volume24h: 28500000000,
    marketCap: 1320000000000,
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change24h: -1.23,
    volume24h: 15200000000,
    marketCap: 415000000000,
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    price: 178.90,
    change24h: 5.67,
    volume24h: 3200000000,
    marketCap: 78000000000,
  },
  {
    id: '4',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.58,
    change24h: -0.45,
    volume24h: 450000000,
    marketCap: 20500000000,
  },
  {
    id: '5',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.23,
    change24h: 1.89,
    volume24h: 280000000,
    marketCap: 9500000000,
  },
]

export const MarketTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof MarketData>('marketCap')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const filteredData = mockMarketData
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (field: keyof MarketData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`
    } else {
      return `$${value.toFixed(2)}`
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Market Overview</h2>
          <p className="text-gray-400">Real-time cryptocurrency prices and market data</p>
        </div>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-navy-800">
              {['name', 'price', 'change24h', 'volume24h', 'marketCap'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as keyof MarketData)}
                  className="text-left py-3 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortField === field && (
                      <span className="text-mint-400">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-navy-800 hover:bg-navy-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center text-navy-950 font-bold">
                      {item.symbol[0]}
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-white">{formatCurrency(item.price)}</p>
                </td>
                <td className="py-4 px-4">
                  <div
                    className={`flex items-center gap-1 ${
                      item.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {item.change24h >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span className="font-medium">{Math.abs(item.change24h).toFixed(2)}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-gray-300">{formatCurrency(item.volume24h)}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-gray-300">{formatCurrency(item.marketCap)}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button size="sm" variant="outline">
                    Trade
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
