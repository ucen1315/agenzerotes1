import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { Dashboard } from './pages/Dashboard'
import { Market } from './pages/Market'
import { Security } from './pages/Security'
import { useAppStore } from './store/useAppStore'

const Settings: React.FC = () => (
  <div className="animate-fade-in">
    <div className="mb-8">
      <h1 className="section-title mb-2">Settings</h1>
      <p className="section-subtitle">Application settings coming soon.</p>
    </div>
    <div className="card p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <p className="text-gray-400">Settings page is under construction.</p>
    </div>
  </div>
)

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentPage, isAuthenticated, login } = useAppStore()

  useEffect(() => {
    // Auto-login for demo purposes
    if (!isAuthenticated) {
      login('demo@decrypt.app', 'password')
    }
  }, [isAuthenticated, login])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'market':
        return <Market />
      case 'security':
        return <Security />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f]">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <div className="flex-1 flex flex-col min-h-screen lg:ml-0 transition-all duration-300">
            <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="max-w-[1600px] mx-auto"
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
