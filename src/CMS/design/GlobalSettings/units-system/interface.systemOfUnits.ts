import type { Field, RowField } from 'payload'
import { unitOptions } from './options'

export const systemOfUnitsField: Field = {
  name: 'systemOfUnitsMeta',
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
        if (!data?.units || !Array.isArray(data.units)) return null

        // Create an array of objects with label and value
        return data.units.map((value) => ({
          value,
          label: unitValueToLabelMap[value] || value,
        }))
      },
    ],
  },
}

export type SystemOfUnitsInterfaceProps = {
  defaultUnit?: string
}

export const systemOfUnitsInterface = ({
  defaultUnit = 'm',
}: SystemOfUnitsInterfaceProps = {}): RowField => ({
  type: 'row',
  fields: [
    {
      type: 'select',
      name: 'globalUnit',
      label: 'Global System of Units',
      interfaceName: 'SystemOfUnitsInterface',
      defaultValue: defaultUnit,
      hasMany: false,
      admin: {
        components: {
          Field: {
            path: '@CMS/design/GlobalSettings/units-system/Component#SystemOfUnitsComponent',
          },
        },
        isClearable: true,
        isSortable: true,
      },
      options: unitOptions,
    },
    systemOfUnitsField,
  ],
})

// Create a mapping of values to labels for easy lookup
export const unitValueToLabelMap: Record<string, string> = unitOptions.reduce(
  (acc, option) => {
    if (typeof option === 'string') {
      return { ...acc, [option]: option }
    }
    return { ...acc, [option.value]: option.label }
  },
  {},
)
