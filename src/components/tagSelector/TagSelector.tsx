import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import { TagLike } from '../../data/types'
import useModifier from '../../hooks/useModifier'
import { serializeTagname } from '../../misc/formatting'
import { prepareTag } from '../../misc/prepare'
import { ThemeType } from '../../misc/theme'
import { addTag, fetchSuggestions, setSuggestions } from '../../redux/actions'
import { selectSuggestions } from '../../redux/selectors'
import { AddButton, ModifierButton } from '../common/Buttons'
import DropdownList from './DropdownList'
import TagInput from './TagInput'

const TagSelectorWrapper = styled.div(
  (props: { closed: boolean; ref: (ref: HTMLInputElement) => void; theme: ThemeType }) => css`
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

export default function TagSelector() {
  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  const [tagSelectorRef, setTagSelectorRef] = useState<HTMLDivElement | null>(null)
  const [modifier, nextModifier] = useModifier()

  const suggestions = useSelector(selectSuggestions)

  const activateTag = useCallback(
    ({ name, posts, types }: TagLike) => {
      const tag = prepareTag({
        name,
        types,
        modifier,
        count: posts.toString(),
      })

      dispatch(addTag(tag))

      setValue('')
      dispatch(setSuggestions([]))
    },
    [dispatch, modifier]
  )

  // This effect fetches suggestions for the input value if the value
  //is empty, it ensures the suggestions are as well
  useThrottledEffect(
    () => {
      if (value === '') {
        if (suggestions.length > 0) {
          // Reset Suggestions
          dispatch(setSuggestions([]))
        }
      } else {
        // Fetch Suggestions
        dispatch(fetchSuggestions(value))
      }
    },
    300,
    [value]
  )

  const handleAddClick = useCallback(() => {
    if (value && value.trim()) {
      const sanitizedTagname = serializeTagname(value)
      const suggestion: TagLike | undefined = suggestions.find((s) => s.name === sanitizedTagname)

      if (suggestion) {
        activateTag(suggestion)
      }
    }
  }, [value, activateTag, suggestions])

  return (
    <TagSelectorWrapper ref={setTagSelectorRef} closed={suggestions.length === 0}>
      <ModifierButton onClick={nextModifier} aria-label='Tag Modifier'>
        {modifier}
      </ModifierButton>
      <TagInput value={value} setValue={setValue} onSubmit={handleAddClick} />
      <AddButton onClick={handleAddClick} aria-label='Add Tag'>
        Add
      </AddButton>
      {suggestions.length > 0 && (
        <DropdownList tagSelectorRef={tagSelectorRef} entries={suggestions} onClick={activateTag} />
      )}
    </TagSelectorWrapper>
  )
}
