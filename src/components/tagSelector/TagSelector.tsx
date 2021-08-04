import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css, DefaultTheme } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import useModifier from '../../hooks/useModifier'
import { serializeTagname } from '../../misc/formatting'

import { fetchSuggestions, setSuggestions } from '../../redux/actions'
import { selectSuggestions } from '../../redux/selectors'
import { AddButton, ModifierButton } from '../common/Buttons'
import DropdownList from './DropdownList'
import TagInput from './TagInput'

import { PlusIcon } from '../../icons/FontAwesomeIcons'
import { Supertag, Tag, AnyBiasedTag } from 'r34-types'
import { bias, isSupertag } from '../../data/utils'

const TagSelectorWrapper = styled.div(
  (props: { closed: boolean; ref: (ref: HTMLInputElement) => void; theme: DefaultTheme }) => css`
    display: flex;
    background: white;
    ${props.closed
      ? css`
          border-radius: ${props.theme.dimensions.borderRadius};
        `
      : css`
          border-radius: ${props.theme.dimensions.borderRadius} ${props.theme.dimensions.borderRadius} 0 0;

          > ${AddButton} {
            border-radius: 0 ${props.theme.dimensions.borderRadius} 0 0;
          }

          > ${ModifierButton} {
            border-radius: ${props.theme.dimensions.borderRadius} 0 0 0;
          }
        `}
  `
)

type TagSelectorProps = {
  showSupertags: boolean
  onSubmit: (tag: AnyBiasedTag) => void
}

export default function TagSelector(props: TagSelectorProps) {
  const { onSubmit, showSupertags } = props

  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  const [tagSelectorRef, setTagSelectorRef] = useState<HTMLDivElement | null>(null)
  const [modifier, nextModifier] = useModifier()

  const suggestions = useSelector(selectSuggestions)

  const activateTag = useCallback(
    (tag: Tag | Supertag) => {
      const biasedTag = isSupertag(tag) ? tag : bias(tag, modifier)
      onSubmit(biasedTag)
      setValue('')
    },
    [modifier, onSubmit]
  )

  // This effect fetches suggestions for the input value if the value
  // is empty, it ensures the suggestions are as well
  useThrottledEffect(
    () => {
      if (value === '') {
        if (suggestions.length > 0) {
          dispatch(setSuggestions([]))
        }
      } else {
        dispatch(fetchSuggestions(value, showSupertags))
      }
    },
    300,
    [value]
  )

  const handleAddClick = useCallback(() => {
    if (value.trim()) {
      const sanitizedTagname = serializeTagname(value)
      const suggestion: Tag | undefined = suggestions.find((s) => s.name === sanitizedTagname)

      if (suggestion) activateTag(suggestion)
    }
  }, [value, activateTag, suggestions])

  const hasSuggestions = suggestions.length > 0

  return (
    <TagSelectorWrapper ref={setTagSelectorRef} closed={!hasSuggestions}>
      <ModifierButton onClick={nextModifier} aria-label='Tag Modifier'>
        {modifier}
      </ModifierButton>
      <TagInput value={value} setValue={setValue} onSubmit={handleAddClick} />
      <AddButton onClick={handleAddClick} aria-label='Add Tag'>
        <PlusIcon />
      </AddButton>
      {hasSuggestions && value.length > 0 && (
        <DropdownList tagSelectorRef={tagSelectorRef} entries={suggestions} onClick={activateTag} />
      )}
    </TagSelectorWrapper>
  )
}
