import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react'
import { ApiKeyManager } from '../../components/security/ApiKeyManager'
import { TwoFactorSettings } from '../../components/security/TwoFactorSettings'
import { Card } from '../../components/ui/Card'

export const Security: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center">
          <Shield className="w-6 h-6 text-navy-950" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Security</h1>
          <p className="text-gray-400">Manage your account security settings</p>
        </div>
      </div>

      {/* Security Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Security Score: 85/100</h3>
              <p className="text-gray-400">Your account is well protected</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated</p>
            <p className="text-white font-medium">Today</p>
          </div>
        </div>
      </Card>

      {/* Security Recommendations */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Security Recommendations</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-800 border border-navy-700">
            <Key className="w-5 h-5 text-mint-400" />
            <p className="text-gray-300">Enable two-factor authentication for enhanced security</p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-navy-800 border border-navy-700">
            <Lock className="w-5 h-5 text-mint-400" />
            <p className="text-gray-300">Rotate your API keys regularly</p>
          </div>
        </div>
      </Card>

      {/* Two-Factor Settings */}
      <TwoFactorSettings />

      {/* API Key Manager */}
      <ApiKeyManager />
    </motion.div>
  )
}
