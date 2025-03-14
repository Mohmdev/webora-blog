'use client'

import { cn } from '@utils/ui'
import React from 'react'
import { ResetSiteGeneralData } from './general/reset'
import { SeedSiteGeneralData } from './general/seed'
import { HardResetDatabase } from './reset/hard-reset'
import { MediaReset } from './reset/media-reset'

export const DbInteractionZone: React.FC = () => {
  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap justify-start items-start',
        'min-w-[80px] gap-8 mt-10 mb-4',
      )}
    >
      <div className="flex flex-col grow shrink-0 gap-2">
        <h5 className="text-zinc-500">⚠ Use with caution</h5>
        <p>
          The following actions will reset the database and seed it with demo
          data.
          <br />
          This will delete all existing data and create new records.
        </p>
      </div>
      <div
        className={cn(
          'flex flex-row flex-wrap gap-4',
          'justify-between items-start',
          'w-full',
        )}
      >
        <div className="flex flex-col justify-start items-start flex-nowrap gap-2 w-full max-w-xl">
          <h5 className="text-muted-foreground">Site</h5>

          <div
            className={cn(
              'flex flex-row flex-nowrap gap-4',
              'justify-between items-center w-full',
            )}
          >
            <SeedSiteGeneralData />
            <ResetSiteGeneralData />
          </div>
           <MediaReset className="w-full" />
          <HardResetDatabase className="w-full" />
        </div>

      </div>
    </div>
  )
}
