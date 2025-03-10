import { searchPlugin } from '@payloadcms/plugin-search'
import { SYNC_TO_SEARCH_ENABLED_COLLECTIONS } from '@services/control-board'
import { searchFromPostsFields } from '@services/search/posts/overrides'
import type { Plugin } from 'payload'
import { SyncPostsWithSearch } from './posts/beforeSync'

export const searchService: Plugin = searchPlugin({
  collections: [...SYNC_TO_SEARCH_ENABLED_COLLECTIONS],
  // beforeSync: beforeSyncWithSearch,
  beforeSync: SyncPostsWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [
        ...defaultFields,
        //  ...searchFields
        ...searchFromPostsFields,
      ]
    },
    admin: {
      group: 'Tools',
      defaultColumns: ['meta', 'title', 'taxonomies', 'updatedAt'],
    },
  },
})
