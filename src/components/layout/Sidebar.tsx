import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, TrendingUp, Shield, Settings, Wallet, Zap, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { currentPage, setCurrentPage, wallet, disconnectWallet, connectWallet } = useAppStore()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleConnectWallet = () => {
    const mockWallet = '0x' + Math.random().toString(16).slice(2, 42)
    connectWallet(mockWallet)
  }

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 h-full w-72 z-50',
          'bg-[#12121a]/95 backdrop-blur-xl border-r border-white/5',
          'lg:relative lg:translate-x-0 lg:z-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">DeCrypt</span>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Dashboard</p>
              </div>
            </motion.div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setCurrentPage(item.id as any)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group',
                    isActive
                      ? 'text-white bg-white/10 border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full"
                    />
                  )}
                  <Icon className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors duration-200',
                    isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'
                  )} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 -z-10"
                    />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Wallet Section */}
          <div className="p-4 border-t border-white/5">
            <div className="space-y-3">
              {wallet ? (
                <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-white">Wallet Connected</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono mb-3">
                    {wallet.slice(0, 10)}...{wallet.slice(-8)}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-full text-xs"
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-white">Connect Wallet</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Access your crypto portfolio</p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs"
                    onClick={handleConnectWallet}
                  >
                    <Wallet className="w-3.5 h-3.5 mr-1.5" />
                    Connect
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
