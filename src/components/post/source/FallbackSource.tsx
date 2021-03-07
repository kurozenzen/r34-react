import React from 'react'
import { SourceIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'
import SourceProps from './SourceProps'

export default function FallbackSource({ value }: SourceProps) {
  return (
    <FlexPair>
      <SourceIcon color='white' />
      <span>{value}</span>
    </FlexPair>
  )
}
