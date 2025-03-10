import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  type LinkFields,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { mainCollections, taxonomyCollections } from '@services/control-board'
import { Config, type TextFieldSingleValidation } from 'payload'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: [...mainCollections, ...taxonomyCollections],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) =>
                siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            // required: true,
            validate: ((value, options) => {
              if (
                (options?.siblingData as LinkFields)?.linkType === 'internal'
              ) {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})
