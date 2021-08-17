import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import DropdownListEntry from './DropdownListEntry'
import { dropdownScrollbar, flexColumn, flexColumnGap } from '../../styled/mixins'
import * as r34 from 'r34-types'
import { getInterestingType, isSupertag } from '../../data/tagUtils'
import { SuggestionsError } from '../../data/types'
import { DropdownListError } from './DropdownListError'

function sizeAndPosition(tagSelector: HTMLElement | null) {
  if (tagSelector) {
    const { offsetTop, clientHeight, offsetLeft, clientWidth } = tagSelector

    return css`
      position: absolute;
      top: ${offsetTop + clientHeight}px;
      left: ${offsetLeft}px;
      width: ${clientWidth}px;
      max-height: 50vh;
    `
  } else {
    return css`
      display: none;
    `
  }
}

const ListWrapper = styled.div(
  ({ theme, tagSelectorRef }: { tagSelectorRef: HTMLElement | null; theme: DefaultTheme }) => css`
    ${flexColumn()}
    ${flexColumnGap('1px')}
    ${sizeAndPosition(tagSelectorRef)};
    background: lightgrey;
    box-sizing: border-box;
    border: ${theme.dimensions.borderWidth} ${theme.colors.accentColor} solid;
    border-top: none;
    border-radius: 0 0 3px 3px;
    color: black;
    z-index: 3;

    ${dropdownScrollbar}
  `
)

interface DropdownListProps {
  tagSelectorRef: HTMLElement | null
  entries: r34.AnyTag[]
  onClick: (entry: r34.AnyTag) => void
  error: SuggestionsError | null
}

export default function DropdownList(props: DropdownListProps) {
  const { tagSelectorRef, entries, onClick, error } = props

  return (
    <ListWrapper tagSelectorRef={tagSelectorRef}>
      {error ? (
        <DropdownListError>
          <span>{error.message}.</span>
          <span>{error.results} tags found</span>
        </DropdownListError>
      ) : (
        entries.map((entry) => {
          const type = isSupertag(entry) ? 'supertag' : getInterestingType(entry.types)
          const count = isSupertag(entry) ? Object.keys(entry.tags).length : (entry.count as number)

          return (
            <DropdownListEntry
              key={entry.name}
              onClick={() => onClick(entry)}
              name={entry.name}
              type={type}
              count={count}
            />
          )
        })
      )}
    </ListWrapper>
  )
}
