import React from 'react'
import KofiButton from './KofiButton'
import styled, { css } from 'styled-components'
import RandomTip from './RandomTip'
import { flexColumn, flexColumnGap } from '../../styled/mixins'
import UpdateHighlight from './UpdateHighlight'

const Placeholder = styled.div(
  ({ theme }) => css`
    ${flexColumn()}
    align-items: center;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;

    height: calc(100vh - 400px);
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
