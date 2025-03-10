import { cn } from '@utils/ui'
import * as React from 'react'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        [
          // Base layout
          'flex h-9 w-full',
          // Appearance
          'rounded-md border border-input bg-transparent',
          // Spacing
          'px-3 py-1',
          // Typography
          'text-sm text-foreground',
          // File input styling
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          // Placeholder
          'placeholder:text-muted-foreground',
          // Focus state
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          // Disabled state
          'disabled:cursor-not-allowed disabled:opacity-50',
          'shadow-sm transition-colors',
        ].join(' '),
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
