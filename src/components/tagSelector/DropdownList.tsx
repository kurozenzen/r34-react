import React from "react"
import styled, { css } from "styled-components"
import DropdownListEntry from "./DropdownListEntry"
import TagDataClass from "../../data/Tag"
import { TagType } from "../../data/types"
import { ThemeType } from "../../misc/theme"

function sizeAndPosition(tagSelector: HTMLDivElement | null) {
  if (tagSelector) {
    const { offsetTop, clientHeight, offsetLeft, clientWidth } = tagSelector

    return css`
      position: absolute;
      top: ${offsetTop + clientHeight}px;
      left: ${offsetLeft}px;
      width: ${clientWidth}px;
      max-height: 50vh;
      overflow-y: scroll;
    `
  }

  return ""
}

export const ListWrapper = styled.div(
  (props: { tagSelectorRef: HTMLDivElement | null; theme: ThemeType }) => css`
    display: flex;
    flex-direction: column;
    ${sizeAndPosition(props.tagSelectorRef)};
    background: lightgrey;
    gap: 1px;
    box-sizing: border-box;
    border: ${props.theme.dimensions.borderWidth} ${props.theme.colors.accentColor} solid;
    border-top: none;
    border-radius: 0 0 3px 3px;
    color: black;
    z-index: 3;
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
