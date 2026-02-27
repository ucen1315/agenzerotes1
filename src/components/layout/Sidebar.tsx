import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, TrendingUp, Shield, Settings, Wallet, LogOut, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAppStore } from '../../store/useAppStore'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { currentPage, setCurrentPage, wallet, disconnectWallet, logout } = useAppStore()

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
          x: isOpen ? 0 : -280,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-navy-900 border-r border-navy-700 z-50',
          'lg:translate-x-0 lg:static lg:z-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-navy-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-navy-950" />
              </div>
              <span className="text-xl font-bold text-gradient">Decrypt</span>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden text-gray-400 hover:text-white"
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
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentPage(item.id)
                    if (window.innerWidth < 1024) onToggle()
                  }}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-navy-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              )
            })}
          </nav>

          {/* Wallet Section */}
          <div className="p-4 border-t border-navy-700">
            {wallet ? (
              <div className="space-y-3">
                <div className="bg-navy-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-4 h-4 text-mint-400" />
                    <span className="text-xs text-gray-400">Connected</span>
                  </div>
                  <p className="text-sm font-mono text-white truncate">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </p>
                  <p className="text-xs text-mint-400 mt-1">
                    ${wallet.balance.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button className="w-full btn-primary">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
}
