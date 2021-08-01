import React, { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { TagType } from '../../data/types'
import TypeIcon from '../../icons/TypeIcon'
import { formatCount, formatTagname } from '../../misc/formatting'

interface EntryProps {
  name: string
  posts: number
  types: TagType[]
  onClick: MouseEventHandler
}

const EntryWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 48px 1fr auto;
    min-height: ${theme.dimensions.blockHeight}; // COMPAT: Kiwi Browser
    height: ${theme.dimensions.blockHeight};
    background: white;
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

export default function DropdownListEntry(props: EntryProps) {
  const { name, posts, types, onClick } = props

  const unit = types.includes(TagType.SUPERTAG) ? 'tags' : 'posts'

  return (
    <EntryWrapper onClick={onClick}>
      <Icon>
        <TypeIcon types={types} />
      </Icon>
      <Name>{formatTagname(name)}</Name>
      <Count>
        {formatCount(posts)} {unit}
      </Count>
    </EntryWrapper>
  )
}
