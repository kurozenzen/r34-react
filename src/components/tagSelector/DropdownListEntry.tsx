import React, { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { TagType } from 'r34-types'
import TypeIcon from '../../icons/TypeIcon'
import { formatCount, formatTagname } from '../../misc/formatting'

const EntryWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 48px 1fr auto;
    min-height: ${theme.dimensions.blockHeight}; // COMPAT: Kiwi Browser
    height: ${theme.dimensions.blockHeight};
    background: ${theme.colors.backgroundColor2};
    align-items: center;
    cursor: pointer;
  `
)

const Name = styled.span`
  grid-column: 2/3;
`

const Count = styled.span(
  ({ theme }) => css`
    grid-column: 3/4;
    padding-right: ${theme.dimensions.bigSpacing};
  `
)

const Icon = styled.div`
  grid-column: 1/2;
  text-align: center;
`

type Unit = 'tags' | 'posts'

interface EntryProps {
  name: string
  count: number
  type?: TagType
  onClick: MouseEventHandler
}

export default function DropdownListEntry(props: EntryProps) {
  const { name, count, type, onClick } = props

  const unit: Unit = type === 'supertag' ? 'tags' : 'posts'

  return (
    <EntryWrapper onClick={onClick}>
      <Icon>
        <TypeIcon type={type} />
      </Icon>
      <Name>{formatTagname(name)}</Name>
      <Count>
        {count && formatCount(count)} {unit}
      </Count>
    </EntryWrapper>
  )
}
