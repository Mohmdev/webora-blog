# Global Settings Provider

This module provides access to global settings from Payload CMS throughout the application, specifically for currency and unit formatting.

## Two Approaches

There are two ways to use global settings in your components:

### 1. Client-Side Approach (React Hooks)

Use this approach in client components (marked with `'use client'`):

```tsx
'use client'

import { useCurrency, useUnit } from '@providers/GlobalSettings/hooks'

export function MyClientComponent() {
  const { format: formatCurrency } = useCurrency()
  const { format: formatUnit } = useUnit()
  
  return (
    <div>
      <p>Price: {formatCurrency(100000)}</p>
      <p>Area: {formatUnit(150)}</p>
    </div>
  )
}
```

### 2. Server-Side Approach

Use this approach in server components (default in Next.js App Router):

```tsx
import { getGlobalUnits } from '@providers/GlobalSettings/server'

export async function MyServerComponent() {
  const { formatCurrency, formatUnit } = await getGlobalUnits()
  
  return (
    <div>
      <p>Price: {formatCurrency(100000)}</p>
      <p>Area: {formatUnit(150)}</p>
    </div>
  )
}
```

## Available Functions

Both approaches provide the same core functionality:

- `formatCurrency(amount: number)`: Formats a number as currency using the global currency setting
- `formatUnit(value: number)`: Formats a number with the appropriate unit using the global unit setting
- `convertUnit(value: number, fromUnit: string, toUnit: string)`: Converts a value from one unit to another

## Implementation Details

- The client-side approach uses React Context and hooks
- The server-side approach uses Payload's `getCachedGlobalWithSelect` utility
- Both approaches use the same formatting utilities under the hood

## Example Components

- `Card2.tsx`: Server component example using `getGlobalSettings()`
- `Card2Client.tsx`: Client component example using hooks 