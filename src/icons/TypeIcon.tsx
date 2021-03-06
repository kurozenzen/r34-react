import React, { MouseEventHandler, useMemo } from 'react'
import { NO_OP, TagType } from '../data/types'
import { CharacterIcon, CopyrightIcon, ArtistIcon, RatingIcon, SourceIcon } from './Icons'

interface TypeIconProps {
  types?: string[]
  className?: string
  color?: string
  size?: number
  onClick?: MouseEventHandler
  left?: boolean
  right?: boolean
}

export default function TypeIcon(props: TypeIconProps) {
  const { types = [], className = '', onClick = NO_OP } = props
  const interestingType = useMemo(() => types.find((t) => !t.match(/^[general|ambiguous]$/)), [types])

  switch (interestingType) {
    case TagType.CHARACTER:
      return <CharacterIcon className={className} onClick={onClick} />
    case TagType.COPYRIGHT:
      return <CopyrightIcon className={className} onClick={onClick} />
    case TagType.ARTIST:
      return <ArtistIcon className={className} onClick={onClick} />
    case TagType.RATING:
      return <RatingIcon className={className} onClick={onClick} />
    case TagType.SOURCE:
      return <SourceIcon className={className} onClick={onClick} />
    default:
      return null
  }
}
