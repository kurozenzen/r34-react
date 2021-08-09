import React from 'react'
import { SourceIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../designsystem/FlexPair'
import SourceProps from './SourceProps'

export default function FallbackSource({ value }: SourceProps) {
  return (
    <FlexPair data-testid='text-source'>
      <SourceIcon color='white' />
      <span>{value}</span>
    </FlexPair>
  )
}
