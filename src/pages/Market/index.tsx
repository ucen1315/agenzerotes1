import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MarketTable } from '../../components/market/MarketTable'
import { Asset } from '../../types'
import { apiService } from '../../services/mockApi'

export const Market: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    setIsLoading(true)
    const data = await apiService.getAssets()
    setAssets(data)
    setIsLoading(false)
  }

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
        <h1 className="text-3xl font-bold text-white mb-2">Market</h1>
        <p className="text-gray-400">Track real-time prices and market trends.</p>
      </div>

      <MarketTable assets={assets} />
    </motion.div>
  )
}
