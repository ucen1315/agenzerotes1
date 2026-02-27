import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, Search, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Asset } from '../../types'
import { formatCurrency, formatNumber, formatPercentage } from '../../lib/utils'

interface MarketTableProps {
  assets: Asset[]
}

type SortField = 'price' | 'change24h' | 'marketCap' | 'volume24h'
type SortOrder = 'asc' | 'desc'

export const MarketTable: React.FC<MarketTableProps> = ({ assets }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('marketCap')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const filteredAndSortedAssets = useMemo(() => {
    let filtered = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [assets, searchTerm, sortField, sortOrder])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const SortButton: React.FC<{ field: SortField; label: string }> = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
        sortField === field ? 'text-mint-400' : 'text-gray-400 hover:text-white'
      }`}
    >
      <span>{label}</span>
      <ArrowUpDown className="w-3 h-3" />
    </button>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Market Overview</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Asset</th>
                <th className="text-right py-3 px-4">
                  <SortButton field="price" label="Price" />
                </th>
                <th className="text-right py-3 px-4">
                  <SortButton field="change24h" label="24h Change" />
                </th>
                <th className="text-right py-3 px-4">
                  <SortButton field="marketCap" label="Market Cap" />
                </th>
                <th className="text-right py-3 px-4">
                  <SortButton field="volume24h" label="Volume (24h)" />
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedAssets.map((asset, index) => (
                <motion.tr
                  key={asset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-navy-700/50 hover:bg-navy-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-navy-700 to-navy-800 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{asset.name}</p>
                        <p className="text-sm text-gray-400">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-white">
                    {formatCurrency(asset.price)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`flex items-center justify-end space-x-1 ${
                      asset.change24h >= 0 ? 'text-crypto-green' : 'text-crypto-red'
                    }`}>
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="font-medium">{formatPercentage(asset.change24h)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">
                    ${formatNumber(asset.marketCap)}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">
                    ${formatNumber(asset.volume24h)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button size="sm" variant="secondary">
                      Trade
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
