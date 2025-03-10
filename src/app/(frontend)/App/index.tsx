import { cn } from '@utils/ui'
import React from 'react'
import { NavWrapper } from './nav-wrapper'

export const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main
      className={cn(
        'relative z-1',
        'full-dynamic-height full-dynamic-width',
        'flex flex-col justify-between',
        //
      )}
    >
      <NavWrapper>{children}</NavWrapper>
    </main>
  )
}
