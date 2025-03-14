import { cn } from '@utils/ui'
import React from 'react'
import { Card, CardPostData } from '@components/Card'

export type Props = {
  posts: CardPostData[]
  className?: string
  relationTo?: 'posts' | 'pages'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, className, relationTo = 'posts' } = props

  return (
    <div className={cn('container', className)}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo={relationTo}
                    showCategories
                  />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
