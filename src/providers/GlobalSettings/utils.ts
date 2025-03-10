import type { Currency, Unit } from './types'

/**
 * Format a number as currency based on the provided currency code
 */
export const formatCurrency = (amount: number, currency: Currency): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    // Fallback if the currency is not supported
    return `${currency} ${amount.toLocaleString('en-US')}`
  }
}

/**
 * Format a number with the appropriate unit
 */
export const formatUnit = (value: number, unit: Unit): string => {
  const formattedValue = value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  switch (unit) {
    case 'm':
      return `${formattedValue} m²`
    case 'ft':
      return `${formattedValue} sq ft`
    default:
      return `${formattedValue} ${unit}`
  }
}

/**
 * Convert a value from one unit to another
 */
export const convertUnit = (
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
): number => {
  if (fromUnit === toUnit) return value

  // Conversion factors
  const conversionFactors: Record<string, Record<string, number>> = {
    m: {
      ft: 10.7639, // 1 square meter = 10.7639 square feet
    },
    ft: {
      m: 0.092903, // 1 square foot = 0.092903 square meters
    },
  }

  const factor = conversionFactors[fromUnit]?.[toUnit]

  if (!factor) {
    console.warn(`Conversion from ${fromUnit} to ${toUnit} not supported`)
    return value
  }

  return value * factor
}
