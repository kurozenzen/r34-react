import React from 'react'
import styled from 'styled-components'
import { flexRowWithGap } from '../../styled/mixins'

interface FlexPairProps {
  children: [JSX.Element, JSX.Element]
}

const Wrapper = styled.div`
  ${flexRowWithGap}
`

export default function FlexPair({ children }: FlexPairProps) {
  return <Wrapper>{children}</Wrapper>
}
