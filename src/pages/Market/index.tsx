import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react'
import { MarketTable } from '../../components/market/MarketTable'
import { Card } from '../../components/ui/Card'

export const Market: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-navy-950" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Market</h1>
          <p className="text-gray-400">Real-time cryptocurrency prices and market data</p>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-mint-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-mint-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Market Cap</p>
              <p className="text-2xl font-bold text-white">$2.45T</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-mint-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-mint-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">24h Volume</p>
              <p className="text-2xl font-bold text-white">$89.2B</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-mint-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-mint-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">BTC Dominance</p>
              <p className="text-2xl font-bold text-white">52.3%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Market Table */}
      <MarketTable />
    </motion.div>
  )
}
