import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'md', className }) => {
  const variants = {
    success: 'bg-crypto-green/20 text-crypto-green border border-crypto-green/30',
    warning: 'bg-crypto-yellow/20 text-crypto-yellow border border-crypto-yellow/30',
    danger: 'bg-crypto-red/20 text-crypto-red border border-crypto-red/30',
    info: 'bg-mint-500/20 text-mint-400 border border-mint-500/30',
    default: 'bg-navy-700 text-gray-300 border border-navy-600',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.span>
  )
}
