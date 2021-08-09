import React from 'react'
import KofiButton from './KofiButton'
import styled, { css } from 'styled-components'
import RandomTip from './RandomTip'
import { flexColumnWithGap } from '../../styled/mixins'
import UpdateHighlight from './UpdateHighlight'

const Placeholder = styled.div(
  ({ theme }) => css`
    ${flexColumnWithGap}
    align-items: center;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;

    padding: 0 ${theme.dimensions.gutter};
  `
)

export default function SearchPlaceholder() {
  return (
    <Placeholder>
      <UpdateHighlight />
      <RandomTip />
      <KofiButton id='V7V73PWW9' label='Support Me on Ko-fi' />
    </Placeholder>
  )
}
