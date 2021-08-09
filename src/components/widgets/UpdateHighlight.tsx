import React from 'react'
import styled, { css } from 'styled-components'
import { WrenchIcon } from '../../icons/FontAwesomeIcons'
import { borderRadius, flexColumnWithGap, layer } from '../../styled/mixins'
import FlexPair from '../designsystem/FlexPair'
import { SmallTitle } from '../designsystem/Text'

const Wrapper = styled(FlexPair)(
  ({ theme }) => css`
    ${borderRadius}
    ${layer}
    width: 100%;
    padding: ${theme.dimensions.hugeSpacing};
    max-width: ${theme.dimensions.bodyWidth};
  `
)

const Message = styled.div`
  ${flexColumnWithGap}
`

const deadline = new Date('12-08-2021')

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
        <p>
          The account system is a lot better now. I also added so called supertags, which require you to be logged in to
          use.
        </p>
        <p>
          They are pretty self explanatory tbh but in short they are multiple tags combined into one, just add 2 or more
          tags to your search and get started. You can manage your supertags from settings {'->'} account.
        </p>
      </Message>
    </Wrapper>
  )
}
