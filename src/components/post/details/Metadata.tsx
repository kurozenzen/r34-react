import React from 'react'
import styled from 'styled-components'
import { Post } from 'r34-types'
import { CalendarIcon, CheckIcon, ImageIcon, SourceIcon } from '../../../icons/FontAwesomeIcons'
import { formatDateTime, formatTime } from '../../../misc/formatting'
import FlexPair from '../../common/FlexPair'
import { Faded } from '../../common/Text'
import { AdditionalDetails } from './AdditonalDetails'

const Entry = styled(Faded)`
  white-space: nowrap;
`

type MetadataProps = Pick<Post, 'created_at' | 'status' | 'width' | 'height' | 'id'>

export default function Metadata(props: MetadataProps) {
  const { created_at, width, height, id, status } = props

  const createdAt = new Date(created_at)

  debugger

  return (
    <AdditionalDetails>
      <FlexPair>
        <SourceIcon />
        <Entry>{id}</Entry>
      </FlexPair>

      <FlexPair>
        <CalendarIcon />
        <Entry>
          {formatDateTime(createdAt)} ({formatTime(Date.now() - createdAt.getTime())} ago)
        </Entry>
      </FlexPair>

      <FlexPair>
        <CheckIcon />
        <Entry>{status}</Entry>
      </FlexPair>

      <FlexPair>
        <ImageIcon />
        <Entry>
          {width} x {height}
        </Entry>
      </FlexPair>
    </AdditionalDetails>
  )
}
