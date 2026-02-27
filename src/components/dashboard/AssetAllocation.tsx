import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { PortfolioAsset } from '../../types'

interface AssetAllocationProps {
  assets: PortfolioAsset[]
}

const COLORS = ['#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1', '#0d9488', '#0f766e', '#115e59']

export const AssetAllocation: React.FC<AssetAllocationProps> = ({ assets }) => {
  const chartData = assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.allocation,
    color: COLORS[index % COLORS.length],
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-800 border border-navy-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-mint-400">{payload[0].value.toFixed(2)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value: string) => <span className="text-gray-300 text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {assets.slice(0, 5).map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-gray-300">{asset.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">{asset.allocation.toFixed(1)}%</span>
                <span className="text-gray-400">${asset.value.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
