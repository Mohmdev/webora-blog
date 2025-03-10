import { populateAuthors } from '@CMS/_hooks/populateAuthors'
import { populatePublishedAt } from '@CMS/_hooks/populatePublishedAt'
import {
  revalidatePost,
  revalidateDelete,
} from '@CMS/_hooks/revalidatePost'
import { authorsField } from '@fields/shared/authorsField'
import { categoriesField } from '@fields/shared/categoriesField'
import { noindexField } from '@fields/shared/noindexField'
import { populateAuthorsField } from '@fields/shared/populatedAuthorsField'
import { publishedAtField } from '@fields/shared/publishedAtField'
import { relatedDocsField } from '@fields/shared/relatedDocsField'
import { seoTab } from '@fields/shared/seoTab'
import { slugField } from '@fields/shared/slug/config'
import { tagsField } from '@fields/shared/tagsField'
import { isAdminOrEditor } from '@auth/access/isAdminOrEditor'
import { isAdminOrSelf } from '@auth/access/isAdminOrSelf'
import { publishedOnly } from '@auth/access/publishedOnly'
import { fullLexical } from '@services/editor/fullLexical'
import { getCollectionLivePreviewURL } from '@services/live-preview/getCollectionLivePreviewURL'
import { getCollectionPreviewURL } from '@services/live-preview/getCollectionPreviewURL'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    readVersions: isAdminOrEditor,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'populatedAuthors',
      'slug',
      'updatedAt',
      'createdAt',
    ],
    livePreview: getCollectionLivePreviewURL('posts'),
    preview: getCollectionPreviewURL('posts'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
      unique: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              label: 'Editor',
              name: 'content',
              type: 'richText',
              editor: fullLexical,
            },
          ],
        },
        {
          label: 'Metadata',
          fields: [categoriesField, relatedDocsField, tagsField],
        },
        seoTab,
      ],
    },
    noindexField,
    authorsField,
    populateAuthorsField,
    publishedAtField,
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
    afterRead: [populateAuthors],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
