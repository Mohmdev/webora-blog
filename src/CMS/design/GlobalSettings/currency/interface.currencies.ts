import type { Field, RowField } from 'payload'
import { currencyOptions } from './options'

export const currencyMetaField: Field = {
  name: 'currencyMeta',
  type: 'json',
  admin: {
    hidden: true,
  },
  hooks: {
    beforeChange: [
      () => {
        // Don't store anything for this field in the database
        return undefined
      },
    ],
    afterRead: [
      ({ data }) => {
        if (!data?.currencies || !Array.isArray(data.currencies)) return null

        // Create an array of objects with label and value
        return data.currencies.map((value) => ({
          value,
          label: currencyValueToLabelMap[value] || value,
        }))
      },
    ],
  },
}

export type CurrenciesInterfaceProps = {
  defaultCurrency?: string
}

export const currenciesInterface = ({
  defaultCurrency = 'USD',
}: CurrenciesInterfaceProps = {}): RowField => ({
  type: 'row',
  fields: [
    {
      type: 'select',
      name: 'globalCurrency',
      label: 'Global Currency',
      interfaceName: 'CurrenciesInterface',
      defaultValue: defaultCurrency,
      hasMany: false,
      admin: {
        components: {
          Field: {
            path: '@CMS/design/GlobalSettings/currency/Component#CurrenciesComponent',
          },
        },
        isClearable: true,
        isSortable: true,
      },
      options: currencyOptions,
    },
    currencyMetaField,
  ],
})

// Create a mapping of values to labels for easy lookup
export const currencyValueToLabelMap: Record<string, string> =
  currencyOptions.reduce((acc, option) => {
    if (typeof option === 'string') {
      return { ...acc, [option]: option }
    }
    return { ...acc, [option.value]: option.label }
  }, {})
