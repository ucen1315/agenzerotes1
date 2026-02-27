import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Copy, Eye, EyeOff, Key } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { ApiKey } from '../../types'
import { apiService } from '../../services/mockApi'

export const ApiKeyManager: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read'])
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadApiKeys()
  }, [])

  const loadApiKeys = async () => {
    const keys = await apiService.getApiKeys()
    setApiKeys(keys)
  }

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return
    
    const newKey = await apiService.createApiKey(newKeyName, selectedPermissions)
    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
    setSelectedPermissions(['read'])
    setShowCreateModal(false)
  }

  const handleDeleteKey = async (id: string) => {
    await apiService.deleteApiKey(id)
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const maskKey = (key: string) => {
    return key.slice(0, 8) + '***' + key.slice(-4)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>API Keys</CardTitle>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Key
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {apiKeys.map((key, index) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                key.isActive
                  ? 'bg-navy-800/50 border-navy-700'
                  : 'bg-navy-900/30 border-navy-800 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-mint-500/20 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-mint-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{key.name}</h4>
                    <p className="text-xs text-gray-400">
                      Created {new Date(key.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant={key.isActive ? 'success' : 'default'} size="sm">
                  {key.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <code className="flex-1 bg-navy-900 px-3 py-2 rounded text-sm font-mono text-gray-300">
                  {visibleKeys.has(key.id) ? key.key : maskKey(key.key)}
                </code>
                <button
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded transition-colors"
                >
                  {visibleKeys.has(key.id) ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(key.key)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {key.permissions.map(permission => (
                  <Badge key={permission} variant="info" size="sm">
                    {permission}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-navy-700 flex justify-end">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteKey(key.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Key Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-navy-900 border border-navy-700 rounded-xl p-6 w-full max-w-md"
              >
                <h3 className="text-xl font-bold text-white mb-4">Create New API Key</h3>
                
                <Input
                  label="Key Name"
                  placeholder="e.g., Binance Trading Bot"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="mb-4"
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                  <div className="space-y-2">
                    {['read', 'trade', 'withdraw'].map(permission => (
                      <label key={permission} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                          className="w-4 h-4 rounded border-navy-600 bg-navy-800 text-mint-500 focus:ring-mint-500"
                        />
                        <span className="text-gray-300 capitalize">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateKey}
                    disabled={!newKeyName.trim()}
                    className="flex-1"
                  >
                    Create Key
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
