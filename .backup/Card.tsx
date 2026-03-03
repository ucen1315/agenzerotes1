import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  glassmorphism?: boolean
}

export const Card = React.memo<CardProps>(({
  children,
  className,
  hover = true,
  glow = false,
  glassmorphism = true,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden transition-all duration-300',
        glassmorphism ? 'bg-[#1a1a25] border border-white/10' : 'bg-[#1a1a25]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
        hover && 'hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)] hover:border-white/20',
        hover && 'hover:-translate-y-0.5',
        glow && 'shadow-[0_0_30px_rgba(99,102,241,0.15)]',
        className
      )}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export const CardHeader = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <div className={cn('px-6 pt-6 pb-4', className)}>{children}</div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = React.memo<{ children: React.ReactNode; className?: string; icon?: React.ReactNode }>(({ children, className, icon }) => (
  <div className="flex items-center gap-3">
    {icon && (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
        {icon}
      </div>
    )}
    <h3 className={cn('text-lg font-bold text-white tracking-tight', className)}>{children}</h3>
  </div>
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <p className={cn('text-sm text-gray-500 mt-1', className)}>{children}</p>
))

CardDescription.displayName = 'CardDescription'

export const CardContent = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <div className={cn('px-6 pb-6', className)}>{children}</div>
))

CardContent.displayName = 'CardContent'

export const CardFooter = React.memo<{ children: React.ReactNode; className?: string }>(({ children, className }) => (
  <div className={cn('px-6 pb-6 pt-0 flex items-center gap-3', className)}>{children}</div>
))

CardFooter.displayName = 'CardFooter'
