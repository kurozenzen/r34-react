import React from 'react'
import KofiButton from './KofiButton'
import styled, { css } from 'styled-components'
import RandomTip from '../common/RandomTip'
import { flexColumn, flexColumnGap } from '../../styled/mixins'

const Placeholder = styled.div(
  ({ theme }) => css`
    ${flexColumn()}
    ${flexColumnGap(theme.dimensions.hugeSpacing)}
      align-items: center;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;

    height: calc(100vh - 400px);
    padding: 0 10%;
  `
)

export default function SearchPlaceholder() {
  return (
    <Placeholder>
      <RandomTip />
      <KofiButton id='V7V73PWW9' label='Support Me on Ko-fi' />
    </Placeholder>
  )
}
