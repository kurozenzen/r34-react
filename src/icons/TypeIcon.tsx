import React, { MouseEventHandler } from 'react'
import { NO_OP } from '../data/types'
import { CharacterIcon, CopyrightIcon, ArtistIcon } from './Icons'

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
  const interestingType = types.find((t) => !t.match(/^[general|ambiguous]$/))

  switch (interestingType) {
    case 'character':
      return <CharacterIcon className={className} onClick={onClick} />
    case 'copyright':
      return <CopyrightIcon className={className} onClick={onClick} />
    case 'artist':
      return <ArtistIcon className={className} onClick={onClick} />
    default:
      return null
  }
}
