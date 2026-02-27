import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, TrendingUp, Shield, Settings, Wallet, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { currentPage, setCurrentPage, wallet, disconnectWallet } = useAppStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          width: isCollapsed ? 80 : 320,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 h-full bg-navy-900 border-r border-navy-800 z-50',
          'lg:relative lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-navy-800">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-navy-950" />
                </div>
                <span className="text-xl font-bold text-white">myappkey</span>
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-navy-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage(item.id as any)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-mint-500/10 text-mint-400 border border-mint-500/20'
                      : 'text-gray-400 hover:bg-navy-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Wallet Section */}
          <div className="p-4 border-t border-navy-800">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {wallet ? (
                  <div className="p-3 rounded-lg bg-navy-800 border border-navy-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-4 h-4 text-mint-400" />
                      <span className="text-sm font-medium text-white">Connected</span>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">
                      {wallet.slice(0, 6)}...{wallet.slice(-4)}
                    </p>
                    <button
                      onClick={disconnectWallet}
                      className="mt-2 w-full text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      // Mock wallet connection
                      const mockWallet = '0x' + Math.random().toString(16).slice(2, 42)
                      useAppStore.getState().connectWallet(mockWallet)
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-mint-500 text-navy-950 font-medium hover:bg-mint-400 transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
}
