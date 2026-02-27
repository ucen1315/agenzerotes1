import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, ShieldCheck, ShieldAlert, ToggleLeft, ToggleRight, Bell, Mail, Lock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { SecuritySettings } from '../../types'
import { apiService } from '../../services/mockApi'

export const TwoFactorSettings: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsLoading(true)
    const data = await apiService.getSecuritySettings()
    setSettings(data)
    setIsLoading(false)
  }

  const handleToggle = async (key: keyof SecuritySettings) => {
    if (!settings) return
    
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    
    setIsSaving(true)
    await apiService.updateSecuritySettings(newSettings)
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-500" />
        </CardContent>
      </Card>
    )
  }

  if (!settings) return null

  const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void; label: string; icon: React.ReactNode; description: string }> = ({
    enabled,
    onToggle,
    label,
    icon,
    description
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-between p-4 bg-navy-800/50 rounded-lg border border-navy-700"
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${enabled ? 'bg-mint-500/20' : 'bg-navy-700'}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{label}</h4>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-mint-500' : 'bg-navy-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </motion.div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 2FA Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg border ${
              settings.twoFactorEnabled
                ? 'bg-crypto-green/10 border-crypto-green/30'
                : 'bg-crypto-red/10 border-crypto-red/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              {settings.twoFactorEnabled ? (
                <ShieldCheck className="w-6 h-6 text-crypto-green" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-crypto-red" />
              )}
              <div>
                <h4 className="font-semibold text-white">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-400">
                  {settings.twoFactorEnabled
                    ? 'Your account is protected with 2FA'
                    : 'Enable 2FA for enhanced security'
                  }
                </p>
              </div>
              <Badge variant={settings.twoFactorEnabled ? 'success' : 'warning'} className="ml-auto">
                {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </motion.div>

          {/* Security Toggles */}
          <div className="space-y-3">
            <ToggleSwitch
              enabled={settings.twoFactorEnabled}
              onToggle={() => handleToggle('twoFactorEnabled')}
              label="Two-Factor Authentication"
              icon={<Shield className="w-5 h-5 text-mint-400" />}
              description="Add an extra layer of security to your account"
            />

            <ToggleSwitch
              enabled={settings.emailNotifications}
              onToggle={() => handleToggle('emailNotifications')}
              label="Email Notifications"
              icon={<Mail className="w-5 h-5 text-mint-400" />}
              description="Receive email alerts for important account activities"
            />

            <ToggleSwitch
              enabled={settings.loginAlerts}
              onToggle={() => handleToggle('loginAlerts')}
              label="Login Alerts"
              icon={<Bell className="w-5 h-5 text-mint-400" />}
              description="Get notified when someone logs into your account"
            />
          </div>

          {/* Withdrawal Whitelist */}
          <div className="mt-6 p-4 bg-navy-800/50 rounded-lg border border-navy-700">
            <div className="flex items-center space-x-3 mb-3">
              <Lock className="w-5 h-5 text-mint-400" />
              <h4 className="font-medium text-white">Withdrawal Whitelist</h4>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Only allow withdrawals to these verified addresses
            </p>
            <div className="space-y-2">
              {settings.withdrawalWhitelist.map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-navy-900 rounded border border-navy-700"
                >
                  <code className="text-sm font-mono text-gray-300">
                    {address.slice(0, 10)}...{address.slice(-8)}
                  </code>
                  <Badge variant="success" size="sm">Verified</Badge>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="w-full mt-2">
                Add Address
              </Button>
            </div>
          </div>

          {/* Save Status */}
          {isSaving && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-mint-400"
            >
              Saving changes...
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
