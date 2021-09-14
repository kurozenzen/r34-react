import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import Alias from './Alias'
import * as r34 from 'r34-types'
import { dropdownScrollbar } from '../../styled/mixins/scrollbar'
import { ZIndex } from '../../styled/zIndex'

const ListWrapper = styled.div(({ theme, parentRef }: { theme: DefaultTheme; parentRef: HTMLDivElement }) => {
  if (parentRef) {
    const clientRect = parentRef.getBoundingClientRect()

    return css`
      position: absolute;
      top: ${parentRef.offsetTop + clientRect.height}px;
      left: ${parentRef.offsetLeft}px;
      width: ${clientRect.width}px;

      display: flex;
      flex-direction: column;

      border-bottom-left-radius: ${theme.dimensions.borderRadius};
      border-bottom-right-radius: ${theme.dimensions.borderRadius};
      border: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
      border-top: none;

      background: ${theme.colors.backgroundColor2};
      z-index: ${ZIndex.DROPDOWN};
      color: ${theme.colors.backgroundColor};

      > :not(:last-child) {
        border-bottom: ${theme.dimensions.borderWidth} solid lightgray;
      }

      max-height: 30vh;

      ${dropdownScrollbar}
    `
  } else {
    return css`
      display: none;
    `
  }
})

interface AliasesListProps {
  aliases: r34.AliasTag[]
  modifier: r34.TagModifier
  parentRef: HTMLDivElement
}

export default function AliasesList(props: AliasesListProps) {
  const { aliases, modifier, parentRef } = props

  return (
    <ListWrapper parentRef={parentRef} className='aliaslist'>
      {aliases.map(({ name, count }) => (
        <Alias key={'a_' + name} name={name} count={count} modifier={modifier} />
      ))}
    </ListWrapper>
  )
}
