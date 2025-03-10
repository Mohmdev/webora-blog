/**
 * Type for currency metadata objects that include both value and label
 */
export type CurrencyMeta = {
  value: string
  label: string
}

/**
 * Type for the currencyMeta field in the API response
 */
export type CurrencyMetaType = CurrencyMeta[] | null

/**
 * Helper function to safely parse currencyMeta from API response
 * This handles cases where it might be a string or already an array
 */
export const parseCurrencyMeta = (currencyMeta: unknown): CurrencyMetaType => {
  if (!currencyMeta) return null

  try {
    // If it's a string, try to parse it
    if (typeof currencyMeta === 'string') {
      return JSON.parse(currencyMeta) as CurrencyMetaType
    }

    // If it's already an array, return it
    if (Array.isArray(currencyMeta)) {
      return currencyMeta as CurrencyMetaType
    }

    return null
  } catch (error) {
    console.error('Error parsing currencyMeta:', error)
    return null
  }
}

/**
 * Helper function to get currency label from value
 * Useful when you only have the currency value but need the label
 */
export const getCurrencyLabel = (
  currencyMeta: CurrencyMetaType,
  value: string,
): string | undefined => {
  if (!currencyMeta) return undefined

  const currency = currencyMeta.find((item) => item.value === value)
  return currency?.label
}
