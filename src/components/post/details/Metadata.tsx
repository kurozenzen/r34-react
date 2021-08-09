import React from 'react'
import styled from 'styled-components'
import { Post } from 'r34-types'
import { CalendarIcon, CheckIcon, ImageIcon, SourceIcon } from '../../../icons/FontAwesomeIcons'
import { formatDatetime, formatTime } from '../../../misc/formatting'
import FlexPair from '../../designsystem/FlexPair'
import { Faded } from '../../designsystem/Text'
import { AdditionalDetails } from './AdditonalDetails'

const Entry = styled(Faded)`
  white-space: nowrap;
`

type MetadataProps = Pick<Post, 'created_at' | 'status' | 'width' | 'height' | 'id'>

export default function Metadata(props: MetadataProps) {
  const { created_at, width, height, id, status } = props

  const createdAt = new Date(created_at)

  return (
    <AdditionalDetails>
      <FlexPair title='Id'>
        <SourceIcon />
        <Entry data-testid='id'>{id}</Entry>
      </FlexPair>

      <FlexPair title='Upload Date'>
        <CalendarIcon />
        <Entry data-testid='date'>
          {formatDatetime(createdAt)} ({formatTime(Date.now() - createdAt.getTime())} ago)
        </Entry>
      </FlexPair>

      <FlexPair title='Status'>
        <CheckIcon />
        <Entry data-testid='status'>{status}</Entry>
      </FlexPair>

      <FlexPair title='Measurements'>
        <ImageIcon />
        <Entry data-testid='size'>
          {width} x {height}
        </Entry>
      </FlexPair>
    </AdditionalDetails>
  )
}
