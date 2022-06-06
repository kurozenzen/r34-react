import React from 'react'
import styled, { css } from 'styled-components'
import { WrenchIcon } from '../../icons/FontAwesomeIcons'
import { flexColumnWithGap } from '../../styled/mixins/layout'
import { layer } from '../../styled/mixins/theming'
import FlexPair from '../designsystem/FlexPair'
import { SmallTitle } from '../designsystem/Text'

const Wrapper = styled(FlexPair)(
  ({ theme }) => css`
    ${layer}
    width: 100%;
    padding: ${theme.dimensions.hugeSpacing};
    max-width: ${theme.dimensions.bodyWidth};
  `
)

const Message = styled.div`
  ${flexColumnWithGap}
`

export default function UpdateHighlight() {
  const now = new Date()

  if (now.getMonth() === 11 && now.getDate() >= 24)
    return (
      <Wrapper>
        <Message>
          <FlexPair>
            <WrenchIcon size='lg' />
            <SmallTitle>Update News</SmallTitle>
          </FlexPair>
          <p>🎄 Merry Christmas 🎄</p>
        </Message>
      </Wrapper>
    )

  return null
}
