import { TagType } from 'r34-types'
import React, { MouseEventHandler } from 'react'
import { NO_OP } from '../data/types'
import { CharacterIcon, CopyrightIcon, ArtistIcon, RatingIcon, SourceIcon, MetaDataIcon } from './FontAwesomeIcons'

interface TypeIconProps {
  type?: TagType
  className?: string
  color?: string
  size?: number
  onClick?: MouseEventHandler
  left?: boolean
  right?: boolean
}

export default function TypeIcon(props: TypeIconProps) {
  const { type, className = '', onClick = NO_OP } = props

  switch (type) {
    case 'character':
      return <CharacterIcon className={className} onClick={onClick} />
    case 'copyright':
      return <CopyrightIcon className={className} onClick={onClick} />
    case 'artist':
      return <ArtistIcon className={className} onClick={onClick} />
    case 'rating':
      return <RatingIcon className={className} onClick={onClick} />
    case 'source':
      return <SourceIcon className={className} onClick={onClick} />
    case 'metadata':
      return <MetaDataIcon className={className} onClick={onClick} />
    default:
      return null
  }
}
