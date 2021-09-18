import React from 'react'
import * as r34 from 'r34-types'
import styled, { css } from 'styled-components'
import { CountUnit } from '../../data/types'
import TypeIcon from '../../icons/TypeIcon'
import { formatCount, formatTagname } from '../../misc/formatting'

const EntryWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 48px 1fr auto;
    background: ${theme.colors.backgroundColor2};
    padding: ${theme.dimensions.bigSpacing} 0;
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

interface EntryProps {
  name: string
  count: number
  type?: r34.TagType
  onClick: React.MouseEventHandler
}

export default function DropdownListEntry(props: EntryProps) {
  const { name, count, type, onClick } = props

  const unit: CountUnit = type === 'supertag' ? 'tags' : 'posts'

  return (
    <EntryWrapper onClick={onClick} role='listitem'>
      <Icon>
        <TypeIcon type={type} />
      </Icon>
      <Name>{formatTagname(name)}</Name>
      <Count title={`${count} ${unit}`}>
        {count && formatCount(count)} {unit}
      </Count>
    </EntryWrapper>
  )
}
