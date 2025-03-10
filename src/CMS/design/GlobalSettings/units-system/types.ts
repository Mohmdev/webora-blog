/**
 * Type for unit metadata objects that include both value and label
 */
export type UnitMeta = {
  value: string
  label: string
}

/**
 * Type for the unitMeta field in the API response
 */
export type UnitMetaType = UnitMeta[] | null

/**
 * Helper function to safely parse unitMeta from API response
 * This handles cases where it might be a string or already an array
 */
export const parseUnitMeta = (unitMeta: unknown): UnitMetaType => {
  if (!unitMeta) return null

  try {
    // If it's a string, try to parse it
    if (typeof unitMeta === 'string') {
      return JSON.parse(unitMeta) as UnitMetaType
    }

    // If it's already an array, return it
    if (Array.isArray(unitMeta)) {
      return unitMeta as UnitMetaType
    }

    return null
  } catch (error) {
    console.error('Error parsing unitMeta:', error)
    return null
  }
}

/**
 * Helper function to get amenity label from value
 * Useful when you only have the amenity value but need the label
 */
export const getUnitLabel = (
  unitMeta: UnitMetaType,
  value: string,
): string | undefined => {
  if (!unitMeta) return undefined

  const unit = unitMeta.find((item) => item.value === value)
  return unit?.label
}
