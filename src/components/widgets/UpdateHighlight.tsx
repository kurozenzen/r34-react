import React from 'react'
import styled, { css } from 'styled-components'
import { WrenchIcon } from '../../icons/FontAwesomeIcons'
import { borderRadius, layer } from '../../styled/mixins'
import FlexPair from '../common/FlexPair'

const Wrapper = styled(FlexPair)(
  ({ theme }) => css`
    ${borderRadius}
    ${layer}
    width: 100%;
    padding: ${theme.dimensions.hugeSpacing};
    max-width: ${theme.dimensions.bodyWidth};
  `
)

const deadline = new Date('2021-08-01')

export default function UpdateHighlight() {
  if (new Date() > deadline) {
    return null
  }

  return (
    <Wrapper>
      <WrenchIcon size={'lg'} />
      <span>
        Hey there! I added an experimental account system. This enables saving and loading preferences as well as
        sharing them across different devices. Check it out in <a href='#settings'>Settings</a> and let me know what you
        think of it.
      </span>
    </Wrapper>
  )
}
