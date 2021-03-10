import React from 'react'
import styled, { css } from 'styled-components'
import DropdownListEntry from './DropdownListEntry'
import TagDataClass from '../../data/TagDataClass'
import { TagType } from '../../data/types'
import { ThemeType } from '../../misc/theme'
import { flexColumn, flexColumnGap } from '../../styled/mixins'

function sizeAndPosition(tagSelector: HTMLDivElement | null) {
  if (tagSelector) {
    const { offsetTop, clientHeight, offsetLeft, clientWidth } = tagSelector

    return css`
      position: absolute;
      top: ${offsetTop + clientHeight}px;
      left: ${offsetLeft}px;
      width: ${clientWidth}px;
      max-height: 50vh;
    `
  }

  return ''
}

const ListWrapper = styled.div(
  ({ theme, tagSelectorRef }: { tagSelectorRef: HTMLDivElement | null; theme: ThemeType }) => css`
    ${flexColumn()}
    ${flexColumnGap('1px')}
    ${sizeAndPosition(tagSelectorRef)};
    background: lightgrey;
    box-sizing: border-box;
    border: ${theme.dimensions.borderWidth} ${theme.colors.accentColor} solid;
    border-top: none;
    border-radius: 0 0 3px 3px;
    color: black;
    overflow-y: auto;
    z-index: 3;

    ::-webkit-scrollbar {
      width: 8px;

      :hover {
        background: ${theme.colors.layerBg};
      }
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${theme.colors.backgroundColor2};
      border-left: 1px lightgray solid;
    }

    /* Handle */
    :hover {
      ::-webkit-scrollbar {
        background: ${theme.colors.backgroundColor}20;
      }
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.backgroundColor}40;
      border-radius: 1000px;

      :hover {
        background: ${theme.colors.backgroundColor}30;
      }
    }
  `
)

interface DropdownListProps {
  tagSelectorRef: HTMLDivElement | null
  entries: {
    name: string
    posts: number
    types: TagType[]
  }[]
  onClick: (entry: TagDataClass) => void
}

export default function DropdownList(props: DropdownListProps) {
  const { tagSelectorRef, entries, onClick } = props

  return entries && entries.length > 0 ? (
    <ListWrapper tagSelectorRef={tagSelectorRef}>
      {entries.map((entry) => (
        <DropdownListEntry key={entry.name} onClick={() => onClick(entry)} {...entry} />
      ))}
    </ListWrapper>
  ) : null
}
