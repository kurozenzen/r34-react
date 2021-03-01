import React from 'react'
import styled, { css } from 'styled-components'
import { Modifier } from '../../data/types'
import { flexRowWithGap } from '../../styled/mixins'
import TagName from './TagName'

interface AliasProps {
  modifier: Modifier
  name: string
  count?: number | null
}

const AliasWrapper = styled.div(
  ({ theme }) => css`
    ${flexRowWithGap({ theme })}
    padding: 0 ${theme.dimensions.bigSpacing};
    height: ${theme.dimensions.blockHeight};
    font-size: ${theme.fontSizes.content};
  `
)

export default function Alias(props: AliasProps) {
  const { modifier, name, count } = props

  return (
    <AliasWrapper>
      <TagName modifier={modifier} name={name} count={count} />
    </AliasWrapper>
  )
}
