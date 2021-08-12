import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css, DefaultTheme } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import useModifier from '../../hooks/useModifier'
import { fetchSuggestions, setSuggestions } from '../../redux/actions'
import { selectSuggestions, selectSuggestionsError } from '../../redux/selectors'
import { AddButton, ModifierButton } from '../designsystem/Buttons'
import DropdownList from './DropdownList'
import TagInput from './TagInput'
import { PlusIcon } from '../../icons/FontAwesomeIcons'
import { Supertag, Tag, AnyBiasedTag, AnyTag } from 'r34-types'
import { bias, isSupertag, serializeTagname } from '../../data/tagUtils'

const TagSelectorWrapper = styled.form(
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
  const [tagSelectorRef, setTagSelectorRef] = useState<HTMLElement | null>(null)
  const [modifier, nextModifier] = useModifier()

  const suggestions = useSelector(selectSuggestions)
  const error = useSelector(selectSuggestionsError)

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
      }
      if (value.length >= 3) {
        dispatch(fetchSuggestions(value, showSupertags))
      }
    },
    300,
    [value]
  )

  const handleAddClick = useCallback(() => {
    if (value.trim()) {
      const sanitizedTagname = serializeTagname(value)
      const suggestion: AnyTag | undefined = suggestions.find((s) => s.name === sanitizedTagname)

      if (suggestion) activateTag(suggestion)
    }
  }, [value, activateTag, suggestions])

  const showList = suggestions.length > 0 || error !== null

  const preventDefault = useCallback((e) => e.preventDefault(), [])

  return (
    <TagSelectorWrapper ref={setTagSelectorRef} closed={!showList} onSubmit={preventDefault}>
      <ModifierButton onClick={nextModifier} aria-label='Tag Modifier' title='Tag Modifier'>
        {modifier}
      </ModifierButton>
      <TagInput value={value} setValue={setValue} onSubmit={handleAddClick} />
      <AddButton onClick={handleAddClick} aria-label='Add Tag'>
        <PlusIcon title='Add tag' />
      </AddButton>
      {showList && value.length > 0 && (
        <DropdownList tagSelectorRef={tagSelectorRef} entries={suggestions} error={error} onClick={activateTag} />
      )}
    </TagSelectorWrapper>
  )
}
