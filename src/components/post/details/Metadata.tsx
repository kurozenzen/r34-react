import React from 'react'
import styled from 'styled-components'
import PostDataClass from '../../../data/PostDataClass'
import { CalendarIcon, CheckIcon, ImageIcon, SourceIcon } from '../../../icons/FontAwesomeIcons'
import { formatDateTime, formatTime } from '../../../misc/formatting'
import FlexPair from '../../common/FlexPair'
import { Faded } from '../../common/Text'
import { AdditionalDetails } from './AdditonalDetails'

const Entry = styled(Faded)`
  white-space: nowrap;
`

type MetadataProps = Pick<PostDataClass, 'created_at' | 'status' | 'width' | 'height' | 'id'>

export default function Metadata(props: MetadataProps) {
  const { created_at, status, width, height, id } = props

  // Status icon is static for now as I don't know what other statuses there are...Probably "deleted" or something..
  return (
    <AdditionalDetails>
      <FlexPair>
        <SourceIcon />
        <Entry>{id}</Entry>
      </FlexPair>
      <FlexPair>
        <CalendarIcon />
        <Entry>
          {formatDateTime(new Date(created_at))} ({formatTime(Date.now() - created_at)} ago)
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
