import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ApiKeyManager } from '../../components/security/ApiKeyManager'
import { TwoFactorSettings } from '../../components/security/TwoFactorSettings'

export const Security: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Security</h1>
        <p className="text-gray-400">Manage your API keys and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <TwoFactorSettings />
        </div>
        <div className="lg:col-span-2">
          <ApiKeyManager />
        </div>
      </div>
    </motion.div>
  )
}
