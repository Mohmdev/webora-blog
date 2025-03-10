'use client'

import { useContext } from 'react'
import { GlobalSettingsContext } from './index'
import type { GlobalSettingsContextType, Unit } from './types'

/**
 * Hook to access the global settings context
 */
export const useGlobalSettings = (): GlobalSettingsContextType => {
  const context = useContext(GlobalSettingsContext)

  if (context === null) {
    throw new Error(
      'useGlobalSettings must be used within a GlobalSettingsProvider',
    )
  }

  return context
}

/**
 * Hook to access and format currency values
 */
export const useCurrency = () => {
  const { globalCurrency, formatCurrency } = useGlobalSettings()

  return {
    currency: globalCurrency,
    format: (amount: number) => formatCurrency(amount),
  }
}

/**
 * Hook to access and format unit values
 */
export const useUnit = () => {
  const { globalUnit, formatUnit, convertUnit } = useGlobalSettings()

  return {
    unit: globalUnit,
    format: (value: number) => formatUnit(value),
    convert: (value: number, fromUnit: Unit, toUnit: Unit) =>
      convertUnit(value, fromUnit, toUnit),
  }
}
