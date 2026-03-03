import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, User, ChevronDown } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

interface TopbarProps {
  onMenuToggle: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const { wallet } = useAppStore()

  return (
    <header className="bg-navy-900/50 backdrop-blur-lg border-b border-navy-800 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left side - Menu toggle and Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-navy-800 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-2 bg-navy-800 rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-64"
            />
          </div>
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="relative p-2 rounded-lg hover:bg-navy-800 text-gray-400 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-mint-500 rounded-full" />
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center">
              <User className="w-4 h-4 text-navy-950" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Demo User</p>
              <p className="text-xs text-gray-400">
                {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Not connected'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}
