import React from 'react'
import { PostRating } from 'r34-types'
import { RatingIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../common/FlexPair'

const fullnames: Record<PostRating, string> = {
  e: 'Explicit',
  q: 'Questionable',
  s: 'Safe',
}

export default function Rating(props: { value: PostRating }) {
  return (
    <FlexPair data-testid='rating' title={fullnames[props.value]}>
      <RatingIcon color='white' />
      <span>{props.value.toUpperCase()}</span>
    </FlexPair>
  )
}
