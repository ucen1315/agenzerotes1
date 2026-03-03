import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ShieldCheck, ShieldAlert, Bell, Mail, Lock } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

export const TwoFactorSettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-mint-400" />
        <div>
          <h3 className="text-xl font-bold text-white">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 2FA Status */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-navy-800 border border-navy-700">
          <div className="flex items-center gap-3">
            {twoFactorEnabled ? (
              <ShieldCheck className="w-5 h-5 text-green-400" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-yellow-400" />
            )}
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
          <Button
            variant={twoFactorEnabled ? 'outline' : 'primary'}
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          >
            {twoFactorEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>

        {/* Notification Methods */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Notification Methods</h4>

          {/* Email Notifications */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => setEmailNotifications(!emailNotifications)}
            className="flex items-center justify-between p-4 rounded-lg bg-navy-800 border border-navy-700 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-mint-400" />
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive codes via email</p>
              </div>
            </div>
            <Badge variant={emailNotifications ? 'success' : 'default'}>
              {emailNotifications ? 'Active' : 'Inactive'}
            </Badge>
          </motion.div>

          {/* SMS Notifications */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => setSmsNotifications(!smsNotifications)}
            className="flex items-center justify-between p-4 rounded-lg bg-navy-800 border border-navy-700 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-mint-400" />
              <div>
                <p className="font-medium text-white">SMS Notifications</p>
                <p className="text-sm text-gray-400">Receive codes via SMS</p>
              </div>
            </div>
            <Badge variant={smsNotifications ? 'success' : 'default'}>
              {smsNotifications ? 'Active' : 'Inactive'}
            </Badge>
          </motion.div>
        </div>

        {/* Recovery Codes */}
        <div className="p-4 rounded-lg bg-navy-800 border border-navy-700">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-mint-400" />
            <div>
              <p className="font-medium text-white">Recovery Codes</p>
              <p className="text-sm text-gray-400">Backup codes for account recovery</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Generate New Codes
          </Button>
        </div>
      </div>
    </Card>
  )
}
