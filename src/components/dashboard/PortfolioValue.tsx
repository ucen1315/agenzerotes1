import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { formatCurrency, formatPercentage } from '../../lib/utils'

interface PortfolioValueProps {
  totalValue: number
  change24h: number
}

export const PortfolioValue: React.FC<PortfolioValueProps> = ({ totalValue, change24h }) => {
  const isPositive = change24h >= 0

  return (
    <Card glow>
      <CardHeader>
        <CardTitle className="text-gray-400 text-sm font-medium">Total Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-white mb-2">
                {formatCurrency(totalValue)}
              </h2>
            </motion.div>
            <div className={`flex items-center space-x-2 ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-semibold">{formatPercentage(change24h)}</span>
              <span className="text-gray-400 text-sm">24h</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-mint-400/20 to-mint-600/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-mint-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
