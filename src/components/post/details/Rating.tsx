import React from 'react'
import { PostRating } from 'r34-types'
import { RatingIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'

export default function Rating(props: { value: PostRating }) {
  return (
    <FlexPair data-testid='rating'>
      <RatingIcon color='white' />
      <span>{props.value.toUpperCase()}</span>
    </FlexPair>
  )
}
