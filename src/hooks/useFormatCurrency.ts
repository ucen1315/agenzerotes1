import { useMemo } from 'react'

/**
 * Custom hook for formatting currency values
 * Memoized for performance optimization
 */
export const useFormatCurrency = () => {
  return useMemo(() => {
    return (value: number): string => {
      if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(2)}B`
      } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(2)}M`
      } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(2)}K`
      } else {
        return `$${value.toFixed(2)}`
      }
    }
  }, [])
}

/**
 * Custom hook for formatting percentage values
 */
export const useFormatPercentage = () => {
  return useMemo(() => {
    return (value: number): string => {
      const sign = value >= 0 ? '+' : ''
      return `${sign}${value.toFixed(2)}%`
    }
  }, [])
}
