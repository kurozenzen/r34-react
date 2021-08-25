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

const deadline = new Date('13-08-2021')

export default function UpdateHighlight() {
  if (new Date() > deadline) {
    return null
  }

  return (
    <Wrapper>
      <Message>
        <FlexPair>
          <WrenchIcon size={'lg'} />
          <SmallTitle>Update News</SmallTitle>
        </FlexPair>
        <p>I am currently working on the fullscreen view. Things might not work that well over there.</p>
      </Message>
    </Wrapper>
  )
}
