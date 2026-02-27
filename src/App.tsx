import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { Dashboard } from './pages/Dashboard'
import { Market } from './pages/Market'
import { Security } from './pages/Security'
import { useAppStore } from './store/useAppStore'

const Settings: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
    <p className="text-gray-400">Application settings coming soon.</p>
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
      <div className="min-h-screen bg-navy-950">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
            <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            <main className="flex-1 p-4 lg:p-6 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
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
