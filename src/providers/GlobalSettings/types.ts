export type Currency = string
export type Unit = string

export interface GlobalSettingsContextType {
  // Global settings data
  globalCurrency: Currency
  globalUnit: Unit
  isLoading: boolean

  // Utility functions
  formatCurrency: (amount: number) => string
  formatUnit: (value: number) => string
  convertUnit: (value: number, fromUnit: Unit, toUnit: Unit) => number
}

export interface GlobalSettingsProviderProps {
  children: React.ReactNode
}
