import { revalidateGlobalSettings } from '@CMS/_hooks/revalidateGlobalSettings'
import { isAdminOrEditor } from '@auth/access/isAdminOrEditor'
import { publishedOnly } from '@auth/access/publishedOnly'
import { getGlobalLivePreviewURL } from '@services/live-preview/getGlobalLivePreviewURL'
import { getGlobalPreviewURL } from '@services/live-preview/getGlobalPreviewURL'
import type { GlobalConfig } from 'payload'
import { currenciesInterface } from './currency/interface.currencies'
import { systemOfUnitsInterface } from './units-system/interface.systemOfUnits'

export const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  label: {
    singular: 'Globals',
    plural: 'Globals',
  },
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor,
  },
  admin: {
    livePreview: getGlobalLivePreviewURL('global-settings'),
    preview: getGlobalPreviewURL('global-settings'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'siteIdentity',
          label: 'Site Identity',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'siteName',
                  label: 'Site Name',
                  type: 'text',
                },
                {
                  name: 'siteDescription',
                  label: 'Site Description',
                  type: 'textarea',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                currenciesInterface({ defaultCurrency: 'AED' }),
                systemOfUnitsInterface({ defaultUnit: 'm' }),
              ],
            },
          ],
        },
        {
          name: 'branding',
          label: 'Branding',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'assets',
              admin: {
                description:
                  'Light-colored version of your logo optimized for dark backgrounds and dark mode displays.',
              },
            },
            {
              name: 'logoSquare',
              label: 'Logo 1x1',
              type: 'upload',
              relationTo: 'assets',
              admin: {
                description:
                  'Dark-colored version of your logo optimized for light backgrounds and standard displays.',
              },
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'assets',
              admin: {
                description:
                  'The small icon that is displayed in the browser tab. Recommended size: 32x32px.',
              },
            },
            // {
            //   name: 'brandImage',
            //   label: 'Brand Image',
            //   type: 'upload',
            //   relationTo: 'assets',
            //   admin: {
            //     description:
            //       'Default branded image for SEO metadata, social media cards, and general marketing materials.'
            //   }
            // }
          ],
        },
        {
          name: 'contactInfo',
          label: 'Contact Information',
          fields: [
            {
              name: 'contactName',
              label: 'Contact Name',
              type: 'text',
            },
            {
              name: 'contactEmail',
              label: 'Email Address',
              type: 'text',
            },
            {
              name: 'contactPhone',
              label: 'Phone Number',
              type: 'text',
            },
            {
              name: 'contactAddress',
              label: 'Address',
              type: 'textarea',
            },
            {
              name: 'socialMedia',
              type: 'group',
              label: 'Social Media',
              fields: [
                {
                  name: 'facebook',
                  label: 'Facebook',
                  type: 'text',
                },
                {
                  name: 'twitter',
                  label: 'Twitter',
                  type: 'text',
                },
                {
                  name: 'instagram',
                  label: 'Instagram',
                  type: 'text',
                },
                {
                  name: 'linkedin',
                  label: 'LinkedIn',
                  type: 'text',
                },
                {
                  name: 'youtube',
                  label: 'YouTube',
                  type: 'text',
                },
                {
                  name: 'whatsapp',
                  label: 'WhatsApp',
                  type: 'text',
                },
                {
                  name: 'telegram',
                  label: 'Telegram',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          name: 'globalSeo',
          label: 'Global SEO',
          fields: [
            {
              name: 'keywords',
              label: 'Global SEO Keywords',
              type: 'text',
            },
            {
              name: 'ogImage',
              label: 'Global Meta Image',
              type: 'upload',
              relationTo: 'assets',
              admin: {
                description:
                  'The image that will appear when sharing your site on social media.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobalSettings],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    max: 50,
  },
}
