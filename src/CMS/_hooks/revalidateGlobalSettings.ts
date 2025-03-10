import { revalidatePath, revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateGlobalSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating Global Settings Cache`)

    try {
      revalidateTag('global_global-settings')
      payload.logger.info(`✔ Tag: "global_global-settings" Revalidated`)
    } catch (error) {
      payload.logger.error(
        `❌ Error Revalidating Tag: "global_global-settings"`,
      )
      payload.logger.error(error)
    }

    try {
      revalidatePath('/')
      payload.logger.info(`✔ Path: "/" Revalidated`)
    } catch (error) {
      payload.logger.error(`❌ Error Revalidating Path: "/"`)
      payload.logger.error(error)
    }

    payload.logger.info(``)
  }

  return doc
}
