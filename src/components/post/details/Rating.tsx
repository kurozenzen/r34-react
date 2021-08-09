import React from 'react'
import * as r34 from 'r34-types'
import { RatingIcon } from '../../../icons/FontAwesomeIcons'
import FlexPair from '../../designsystem/FlexPair'
import { useTheme } from 'styled-components'

const fullnames: Record<r34.PostRating, string> = {
  e: 'Explicit',
  q: 'Questionable',
  s: 'Safe',
}

interface RatingProps {
  value: r34.PostRating
}

export default function Rating(props: RatingProps) {
  const { value } = props
  const theme = useTheme()

  return (
    <FlexPair data-testid='rating' title={fullnames[value]}>
      <RatingIcon color={theme.colors.text} />
      <span>{value.toUpperCase()}</span>
    </FlexPair>
  )
}
