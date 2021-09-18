import React, { KeyboardEventHandler, MouseEventHandler, SyntheticEvent, useCallback, useState } from 'react'
import styled, { DefaultTheme, css } from 'styled-components'
import { TagModifier, TagType, AliasTag } from 'r34-types'
import useToggle from '../../hooks/useToggle'
import { ArrowDown } from '../../icons/FontAwesomeIcons'
import TypeIcon from '../../icons/TypeIcon'
import AliasesList from './AliasesList'
import { ChipWrapper } from './ChipWrapper'
import TagName from './TagName'
import { TagIsActive } from '../../data/types'

const DropdownArrow = styled(ArrowDown)(
  ({ $collapsed, theme }: { $collapsed: boolean; theme: DefaultTheme }) => css`
    transition: all ${theme.timings.transitionTime} ease-out;
    height: 32px;
    width: 32px !important;
    padding: 8px;
    margin: 0 -8px;
    ${$collapsed
      ? css``
      : css`
          transform: rotate(180deg);
        `}
  `
)

const DropdownWrapper = styled.div(
  ({ theme }) => css`
    .aliaslist {
      border-color: ${theme.colors.backgroundColor2};
    }
  `
)

interface TagChipProps {
  name: string
  modifier: TagModifier
  count?: number
  type?: TagType
  isActive: TagIsActive
  detailed: boolean
  onClick: React.EventHandler<SyntheticEvent>
  onContextMenu?: React.EventHandler<SyntheticEvent>
  aliases?: AliasTag[]
}

export default function TagChip(props: TagChipProps) {
  const { name, count, modifier, type, isActive, detailed, onClick, onContextMenu, aliases } = props

  const [tagRef, setTagRef] = useState<HTMLDivElement | null>(null)
  const [collapsed, toggleCollapsed] = useToggle(true)

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      event.preventDefault()
      event.stopPropagation()
      onClick(event)
    },
    [onClick]
  )

  const handleArrowClick: MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      toggleCollapsed()
    },
    [toggleCollapsed]
  )

  const handleEnter: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === 'Enter') handleClick(event)
    },
    [handleClick]
  )

  const handleContextMenu = React.useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onContextMenu?.(e)
    },
    [onContextMenu]
  )

  return (
    <DropdownWrapper>
      <ChipWrapper
        active={isActive}
        collapsed={collapsed}
        onClick={handleClick}
        onKeyDown={handleEnter}
        onContextMenu={handleContextMenu}
        ref={setTagRef}
        tabIndex={0}
        role='listitem'
      >
        {detailed && <TypeIcon type={type} />}
        <TagName modifier={modifier} name={name} count={count} />
        {detailed && aliases && aliases.length > 0 && (
          <DropdownArrow onClick={handleArrowClick} $collapsed={collapsed} title='Show aliases' />
        )}
      </ChipWrapper>
      {detailed && aliases && aliases.length > 0 && !collapsed && tagRef && (
        <AliasesList aliases={aliases} modifier={modifier} parentRef={tagRef} />
      )}
    </DropdownWrapper>
  )
}
