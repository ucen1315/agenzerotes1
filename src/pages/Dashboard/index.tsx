import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PortfolioValue } from '../../components/dashboard/PortfolioValue'
import { AssetAllocation } from '../../components/dashboard/AssetAllocation'
import { RecentTransactions } from '../../components/dashboard/RecentTransactions'
import { PortfolioAsset, Transaction } from '../../types'
import { apiService } from '../../services/mockApi'

export const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [portfolioData, transactionsData] = await Promise.all([
      apiService.getPortfolio(),
      apiService.getTransactions(),
    ])
    setPortfolio(portfolioData)
    setTransactions(transactionsData)
    setIsLoading(false)
  }

  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0)
  const weightedChange = portfolio.reduce(
    (sum, asset) => sum + (asset.change24h * asset.allocation) / 100,
    0
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your portfolio overview.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioValue totalValue={totalValue} change24h={weightedChange} />
        </div>
        <div>
          <AssetAllocation assets={portfolio} />
        </div>
      </div>

      <div>
        <RecentTransactions transactions={transactions} />
      </div>
    </motion.div>
  )
}
