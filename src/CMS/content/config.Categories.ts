import type { CollectionConfig } from 'payload'
import { slugField } from '@fields/shared/slug/config'
import { anyone } from '@auth/access/anyone'
import { isAdminOrEditor } from '@auth/access/isAdminOrEditor'
import { minimalLexical } from '@services/editor/minimalLexical'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: minimalLexical,
      admin: {
        description: 'Optional',
      },
    },
    {
      label: 'Posts',
      name: 'records',
      type: 'join',
      collection: 'posts',
      on: 'categories',
    },
    ...slugField(),
  ],
}
