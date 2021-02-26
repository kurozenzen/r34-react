import React from 'react'
import styled, { css } from 'styled-components'

interface FlexPairProps {
  children: [JSX.Element, JSX.Element]
}

const Wrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.dimensions.gutter};
  `
)

export default function FlexPair({ children }: FlexPairProps) {
  return <Wrapper>{children}</Wrapper>
}
