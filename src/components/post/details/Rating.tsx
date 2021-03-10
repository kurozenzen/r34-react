import { RatingType } from '../../../data/types'
import React from 'react'
import { RatingIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'

export default function Rating(props: { value: RatingType }) {
  return (
    <FlexPair>
      <RatingIcon color='white' />
      <span>{props.value[0].toUpperCase()}</span>
    </FlexPair>
  )
}
