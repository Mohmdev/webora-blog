import { type ButtonProps, CMSButton } from '@components/CMSButton'
import { cn } from '@utils/ui'
import Link from 'next/link'
import React from 'react'
import type { Post, Page } from '@payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' 
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const getPathPrefix = (relationTo: string) => {
    if (relationTo === 'pages') return '' // home page
    return `/${relationTo}`
  }

  const href =
    type === 'reference' &&
    typeof reference?.value === 'object' &&
    reference.value.slug
      ? `${getPathPrefix(reference?.relationTo)}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <CMSButton asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </CMSButton>
  )
}
