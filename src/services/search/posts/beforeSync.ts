import type { Category, Tag, Media, Post } from '@payload-types'
import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

type beforeSyncProps = {
  originalDoc: Partial<Post>
  searchDoc: DocToSync
}

export const SyncPostsWithSearch: BeforeSync = async ({
  originalDoc,
  searchDoc,
}: beforeSyncProps) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, tags, title, meta } = originalDoc


  const generatedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: (meta?.image as number) || (meta?.image as Media),
      description: meta?.description,
    },
    categories: [],
    tags: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    try {
      const mappedCategories = categories.map((categoryRelation: { relationTo: 'categories'; value: Category | number }) => {
        const category = typeof categoryRelation.value === 'object'
          ? categoryRelation.value
          : { id: categoryRelation.value };

        return {
          relationTo: categoryRelation.relationTo,
          id: category.id,
          title: 'title' in category ? category.title : ''
        };
      })

      generatedDoc.categories = mappedCategories
    } catch (err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search. | ${err}`,
      )
    }
  }

  if (tags && Array.isArray(tags) && tags.length > 0) {
    try {
      const mappedTags = tags.map((tag: number | Tag) => {
        const tagValue = typeof tag === 'object' ? tag : { id: tag };

        return {
          relationTo: 'tags' as const,
          id: tagValue.id,
          title: 'title' in tagValue ? tagValue.title : ''
        };
      });

      generatedDoc.categories = mappedTags
    } catch (err) {
      console.error(
        `Failed. Tag not found when syncing collection '${collection}' with id: '${id}' to search. | ${err}`,
      );
    }
  }

  return generatedDoc
}
