import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export const Card = React.memo<CardProps>(({ children, className, hover = true, glow = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={cn(
        'bg-navy-900/50 backdrop-blur-sm border border-navy-700 rounded-xl p-6',
        'shadow-card hover:shadow-card-hover transition-all duration-300',
        glow && 'shadow-glow',
        className
      )}
    >
      {children}
    </motion.div>
  )
})

Card.displayName = 'Card'

export const CardHeader = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <div className={cn('mb-4', className)}>{children}</div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <h3 className={cn('text-lg font-semibold text-white', className)}>{children}</h3>
))

CardTitle.displayName = 'CardTitle'

export const CardContent = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <div className={cn('', className)}>{children}</div>
))

CardContent.displayName = 'CardContent'
