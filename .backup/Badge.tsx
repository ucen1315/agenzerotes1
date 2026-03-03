import React from 'react'
import { cn } from '../../lib/utils'

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default' | 'accent' | 'neutral'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  className?: string
  pulse?: boolean
}

export const Badge = React.memo<BadgeProps>(({
  children,
  variant = 'default',
  size = 'md',
  className,
  pulse = false,
}) => {
  const variants: Record<BadgeVariant, string> = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    default: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    accent: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    neutral: 'bg-white/5 text-gray-400 border-white/10',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold transition-all duration-200',
        variants[variant],
        sizes[size],
        pulse && 'relative',
        className
      )}
    >
      {pulse && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full animate-pulse',
          variant === 'success' && 'bg-emerald-400',
          variant === 'danger' && 'bg-red-400',
          variant === 'warning' && 'bg-amber-400',
          variant === 'info' && 'bg-blue-400',
          (variant === 'default' || variant === 'accent') && 'bg-indigo-400',
          variant === 'neutral' && 'bg-gray-400',
        )} />
      )}
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'

// Convenience exports for specific badge types
export const SuccessBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="success" />
)
export const WarningBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="warning" />
)
export const DangerBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="danger" />
)
export const InfoBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge {...props} variant="info" />
)
