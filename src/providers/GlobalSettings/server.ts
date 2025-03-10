import { getCachedGlobalWithSelect } from '@data/getGlobalWithSelect'
import type { GlobalSetting } from '@payload-types'
import type { Currency, Unit } from './types'
import { convertUnit, formatCurrency, formatUnit } from './utils'

/**
 * Server-side utility for fetching global settings
 * This can be used in server components where hooks are not available
 */
export async function getGlobalUnits(): Promise<{
  globalCurrency: Currency
  globalUnit: Unit
  formatCurrency: (amount: number) => string
  formatUnit: (value: number) => string
  convertUnit: (value: number, fromUnit: Unit, toUnit: Unit) => number
}> {
  // Default values
  const DEFAULT_CURRENCY = 'USD'
  const DEFAULT_UNIT = 'm'

  try {
    // Use the existing utility to fetch global settings
    const globalSettings: GlobalSetting = await getCachedGlobalWithSelect(
      'global-settings',
      {
        depth: 1,
        select: {
          siteIdentity: {
            globalCurrency: true,
            globalUnit: true,
          },
        },
      },
    )()

    // Extract values from global settings
    const globalCurrency =
      globalSettings?.siteIdentity?.globalCurrency || DEFAULT_CURRENCY
    const globalUnit = globalSettings?.siteIdentity?.globalUnit || DEFAULT_UNIT

    return {
      globalCurrency,
      globalUnit,
      formatCurrency: (amount: number) =>
        formatCurrency(amount, globalCurrency),
      formatUnit: (value: number) => formatUnit(value, globalUnit),
      convertUnit,
    }
  } catch (error) {
    console.error('Error fetching global settings:', error)

    // Return default values if there's an error
    return {
      globalCurrency: DEFAULT_CURRENCY,
      globalUnit: DEFAULT_UNIT,
      formatCurrency: (amount: number) =>
        formatCurrency(amount, DEFAULT_CURRENCY),
      formatUnit: (value: number) => formatUnit(value, DEFAULT_UNIT),
      convertUnit,
    }
  }
}
