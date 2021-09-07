import React from 'react'
import * as r34 from 'r34-types'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css, DefaultTheme } from 'styled-components'
import useThrottledEffect from 'use-throttled-effect'
import { bias, isSupertag, serializeTagname } from '../../data/tagUtils'
import useModifier from '../../hooks/useModifier'
import { SubmitIcon } from '../../icons/FontAwesomeIcons'
import { fetchSuggestions, setSuggestions } from '../../redux/actions'
import { selectSuggestions, selectSuggestionsError } from '../../redux/selectors'
import { AddButton, ModifierButton } from '../designsystem/Buttons'
import DropdownList from './DropdownList'
import TagInput from './TagInput'

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

interface TagSelectorProps {
  showSupertags: boolean
  onSubmit: (tag: r34.AnyBiasedTag) => void
}

export default function TagSelector(props: TagSelectorProps) {
  const { onSubmit, showSupertags } = props

  const dispatch = useDispatch()

  const [value, setValue] = React.useState('')
  const [tagSelectorRef, setTagSelectorRef] = React.useState<HTMLElement | null>(null)
  const [modifier, nextModifier] = useModifier()

  const suggestions = useSelector(selectSuggestions)
  const error = useSelector(selectSuggestionsError)

  const activateTag = React.useCallback(
    (tag: r34.Tag | r34.Supertag) => {
      const biasedTag = isSupertag(tag) ? tag : bias(tag, modifier)
      onSubmit(biasedTag)
      setValue('')
    },
    [modifier, onSubmit]
  )

  // This effect updates suggestions based on the input value
  // if the value is empty, it clears suggestions
  // if the value is not empty, it fetches suggestions from the backend
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

  const handleAddClick = React.useCallback(() => {
    if (value.trim()) {
      const sanitizedTagname = serializeTagname(value)
      const suggestion: r34.AnyTag | undefined = suggestions.find((s) => s.name === sanitizedTagname)

      if (suggestion) {
        activateTag(suggestion)
      } else {
        activateTag({ name: sanitizedTagname, types: [] })
      }
    }
  }, [value, activateTag, suggestions])

  const showList = suggestions.length > 0 || error !== null

  const preventDefault = React.useCallback((e) => e.preventDefault(), [])

  return (
    <TagSelectorWrapper ref={setTagSelectorRef} closed={!showList} onSubmit={preventDefault}>
      <ModifierButton onClick={nextModifier} aria-label='Tag Modifier' title='Cycle tag modifier'>
        {modifier}
      </ModifierButton>
      <TagInput value={value} setValue={setValue} onSubmit={handleAddClick} />
      <AddButton onClick={handleAddClick} aria-label='Add Tag'>
        <SubmitIcon title='Add tag' />
      </AddButton>
      {showList && value.length > 0 && (
        <DropdownList tagSelectorRef={tagSelectorRef} entries={suggestions} error={error} onClick={activateTag} />
      )}
    </TagSelectorWrapper>
  )
}
