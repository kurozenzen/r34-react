import React from 'react'
import { HeartIcon } from '../../icons/FontAwesomeIcons'
import FlexPair from '../common/FlexPair'

export default function Score(props: { value: number }) {
  return (
    <FlexPair>
      <HeartIcon color='white' />
      <span>{props.value}</span>
    </FlexPair>
  )
}
