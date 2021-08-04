import React from 'react'
import { PostRating } from 'r34-types'
import { RatingIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'

export default function Rating(props: { value: PostRating }) {
  return (
    <FlexPair>
      <RatingIcon color='white' />
      <span>{props.value[0].toUpperCase()}</span>
    </FlexPair>
  )
}
