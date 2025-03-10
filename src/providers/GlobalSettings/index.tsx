'use client'

import type { GlobalSetting } from '@payload-types'
import React, { createContext, useEffect, useState } from 'react'
import type {
  GlobalSettingsContextType,
  GlobalSettingsProviderProps,
} from './types'
import { convertUnit, formatCurrency, formatUnit } from './utils'

// Create the context with default values
export const GlobalSettingsContext =
  createContext<GlobalSettingsContextType | null>(null)

// Default values for when data is loading
const DEFAULT_CURRENCY = 'USD'
const DEFAULT_UNIT = 'm'

export const GlobalSettingsProvider: React.FC<GlobalSettingsProviderProps> = ({
  children,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSetting | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)

  // Fetch global settings from the API
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        // Use the same endpoint as the server utility
        const response = await fetch(
          `${window.location.origin}/api/globals/global-settings`,
        )
        if (!response.ok) throw new Error('Failed to fetch global settings')

        const data = await response.json()
        setGlobalSettings(data)
      } catch (error) {
        console.error('Error fetching global settings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGlobalSettings()
  }, [])

  // Extract values from global settings
  const globalCurrency =
    globalSettings?.siteIdentity?.globalCurrency || DEFAULT_CURRENCY
  const globalUnit = globalSettings?.siteIdentity?.globalUnit || DEFAULT_UNIT

  // Create context value
  const contextValue: GlobalSettingsContextType = {
    globalCurrency,
    globalUnit,
    isLoading,
    formatCurrency: (amount: number) => formatCurrency(amount, globalCurrency),
    formatUnit: (value: number) => formatUnit(value, globalUnit),
    convertUnit: (value: number, fromUnit, toUnit) =>
      convertUnit(value, fromUnit, toUnit),
  }

  return (
    <GlobalSettingsContext.Provider value={contextValue}>
      {children}
    </GlobalSettingsContext.Provider>
  )
}
