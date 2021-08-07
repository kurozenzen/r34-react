import { TagType } from 'r34-types'
import React from 'react'
import {
  CharacterIcon,
  CopyrightIcon,
  ArtistIcon,
  RatingIcon,
  SourceIcon,
  MetaDataIcon,
  SupertagIcon,
} from './FontAwesomeIcons'

interface TypeIconProps {
  type?: TagType
  className?: string
}

export default function TypeIcon(props: TypeIconProps) {
  const { type, className = '' } = props

  switch (type) {
    case 'character':
      return <CharacterIcon className={className} />
    case 'copyright':
      return <CopyrightIcon className={className} />
    case 'artist':
      return <ArtistIcon className={className} />
    case 'rating':
      return <RatingIcon className={className} />
    case 'source':
      return <SourceIcon className={className} />
    case 'metadata':
      return <MetaDataIcon className={className} />
    case 'supertag':
      return <SupertagIcon className={className} />
    default:
      return null
  }
}
