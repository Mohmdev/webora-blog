import React from 'react'
import type { HerosInterface } from '@payload-types'
import { HighImpactHero } from '@heros/HighImpact'
import { LowImpactHero } from '@heros/LowImpact'
import { MediumImpactHero } from '@heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<HerosInterface> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
