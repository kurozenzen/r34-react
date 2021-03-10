import React, { KeyboardEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react'
import TypeIcon from '../../icons/TypeIcon'
import { ArrowDown } from '../../icons/FontAwesomeIcons'
import TagDataClass from '../../data/TagDataClass'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveTags, selectAliasesByTagName } from '../../redux/selectors'
import { addTag, removeTag } from '../../redux/actions'
import useToggle from '../../hooks/useToggle'
import TagWrapper from './TagWrapper'
import TagName from './TagName'
import { Modifier } from '../../data/types'
import AliasesList from './AliasesList'
import styled, { css, DefaultTheme } from 'styled-components'

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

interface TagProps extends TagDataClass {
  detailed: boolean
}

export default function Tag(props: TagProps) {
  const { name, count, modifier = Modifier.PLUS, types, detailed } = props

  const [tagRef, setTagRef] = useState<HTMLDivElement | null>(null)
  const [collapsed, toggleCollapsed, resetCollapsed] = useToggle(true)

  const dispatch = useDispatch()
  const activeTags = useSelector(selectActiveTags)
  const aliases = useSelector(selectAliasesByTagName(name))

  const filteredAliases = useMemo(() => (aliases ? aliases.filter((alias) => !(alias.name in activeTags)) : []), [
    activeTags,
    aliases,
  ])

  const isActive = name in activeTags
  const hasAliases = filteredAliases?.length > 0

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      event.stopPropagation()
      const tag = new TagDataClass(name, types, count, modifier)

      if (isActive) {
        dispatch(removeTag(tag))
      } else {
        dispatch(addTag(tag))
      }
    },
    [count, dispatch, isActive, modifier, name, types]
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
      if (event.key === 'Enter') {
        handleClick(event)
      }
    },
    [handleClick]
  )

  return (
    <TagWrapper
      active={isActive}
      collapsed={collapsed}
      onClick={handleClick}
      onKeyDown={handleEnter}
      onMouseLeave={resetCollapsed}
      ref={setTagRef}
    >
      {detailed && <TypeIcon types={types} />}
      <TagName modifier={modifier} name={name} count={count} />
      {detailed && hasAliases && (
        <>
          <DropdownArrow onClick={handleArrowClick} $collapsed={collapsed} />
          {!collapsed && tagRef && <AliasesList aliases={filteredAliases} modifier={modifier} parentRef={tagRef} />}
        </>
      )}
    </TagWrapper>
  )
}
