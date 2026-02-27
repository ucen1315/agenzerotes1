import React from 'react'
import { motion } from 'framer-motion'
import { Menu, Bell, Search, User, ChevronDown } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'

interface TopbarProps {
  onMenuToggle: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const { user, wallet } = useAppStore()

  return (
    <header className="bg-navy-900/80 backdrop-blur-md border-b border-navy-700 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Search bar - Desktop */}
          <div className="hidden md:flex items-center space-x-2 bg-navy-800 rounded-lg px-4 py-2 border border-navy-700 w-96">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets, transactions..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm w-full"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-navy-800"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-mint-500 rounded-full" />
          </motion.button>

          {/* User profile */}
          {user && (
            <motion.div
n              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 bg-navy-800 rounded-lg px-3 py-2 border border-navy-700 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-navy-950" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </motion.div>
          )}

          {/* Wallet balance - Desktop */}
          {wallet && (
            <div className="hidden lg:block bg-navy-800 rounded-lg px-4 py-2 border border-navy-700">
              <p className="text-xs text-gray-400">Total Balance</p>
              <p className="text-lg font-bold text-mint-400">
                ${wallet.balance.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
