import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Transaction } from '../../types'
import { formatCurrency } from '../../lib/utils'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'buy':
        return <ArrowDownRight className="w-4 h-4 text-crypto-green" />
      case 'sell':
        return <ArrowUpRight className="w-4 h-4 text-crypto-red" />
      case 'transfer':
        return <ArrowRight className="w-4 h-4 text-mint-400" />
    }
  }

  const getStatusVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'failed':
        return 'danger'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-navy-800/50 rounded-lg hover:bg-navy-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="text-white font-medium capitalize">{transaction.type} {transaction.asset}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{formatCurrency(transaction.total)}</p>
                <Badge variant={getStatusVariant(transaction.status)} size="sm">
                  {transaction.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
