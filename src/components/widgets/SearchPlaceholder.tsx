import React from 'react'
import { RandomSponsoring } from './SponsoringButtons'
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

    .fa-patreon {
      color: #ff424d;
    }
  `
)

export default function SearchPlaceholder() {
  return (
    <Placeholder>
      <UpdateHighlight />
      <RandomTip />
      <RandomSponsoring />
    </Placeholder>
  )
}
