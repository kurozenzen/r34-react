import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import TagDataClass from '../../data/TagDataClass'
import { Modifier } from '../../data/types'
import Alias from './Alias'

const ListWrapper = styled.div(
  ({ theme, parentRef }: { theme: DefaultTheme; parentRef: HTMLDivElement }) => css`
    position: absolute;
    top: ${parentRef.offsetTop + parentRef.clientHeight + 4}px;
    left: ${parentRef.offsetLeft}px;
    width: ${parentRef.clientWidth + 5}px;

    display: flex;
    flex-direction: column;

    border-bottom-left-radius: ${theme.dimensions.borderRadius};
    border-bottom-right-radius: ${theme.dimensions.borderRadius};
    border: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
    border-top: none;

    background: ${theme.colors.backgroundColor};
    z-index: 3;
    color: ${theme.colors.accentColor};

    > :not(:last-child) {
      border-bottom: ${theme.dimensions.borderWidth} solid ${theme.colors.accentColor};
    }
  `
)

interface AliasesListProps {
  aliases: TagDataClass[]
  modifier: Modifier
  parentRef: HTMLDivElement
}

export default function AliasesList(props: AliasesListProps) {
  const { aliases, modifier, parentRef } = props

  return (
    <ListWrapper parentRef={parentRef}>
      {aliases.map(({ name, count }) => (
        <Alias key={'a_' + name} modifier={modifier} name={name} count={count} />
      ))}
    </ListWrapper>
  )
}
