import React, { useState, useEffect, useCallback } from "react"
import styled, { css } from "styled-components"
import api from "../../misc/api"
import { prepareTag } from "../../misc/prepare"
import { AddButton, ModifierButton } from "../common/Buttons"
import TagInput from "./TagInput"
import DropdownList from "./DropdownList"
import { normalizeTagname } from "../tag/tagUtils"
import { useDispatch, useSelector } from "react-redux"
import { addTag } from "../../redux/actions"
import { ThemeType } from "../../misc/theme"
import { selectPreferences } from "../../redux/selectors"
import { MODIFIER, Modifier } from "../../data/types"

export const TagSelectorWrapper = styled.div(
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
  const [value, setValue] = useState("")
  const [modifier, setModifier] = useState(Modifier.PLUS)
  const [suggestions, setSuggestions] = useState([])
  const { tagSuggestionsCount } = useSelector(selectPreferences)

  const [tagSelectorRef, setTagSelectorRef] = useState<HTMLDivElement | null>(null)

  const activateTag = useCallback(
    ({ name, posts, types }) => {
      dispatch(
        addTag(
          prepareTag({
            name,
            types,
            modifier,
            count: posts,
          })
        )
      )

      setValue("")
      setSuggestions([])
    },
    [dispatch, modifier]
  )

  useEffect(() => {
    const handle = setTimeout(() => {
      if (!value) {
        setSuggestions([])
        return
      }

      api.getTags(normalizeTagname(value), tagSuggestionsCount).then((newSuggestions) => {
        setSuggestions(newSuggestions)
      })
    }, 300)

    return () => clearTimeout(handle)
  }, [tagSuggestionsCount, value])

  const onModifierClick = useCallback(
    () =>
      setModifier(
        modifier === Modifier.PLUS ? Modifier.MINUS : modifier === Modifier.MINUS ? Modifier.OR : Modifier.PLUS
      ),
    [modifier, setModifier]
  )

  const onAddClick = useCallback(() => {
    if (value && value.trim() !== "") {
      const suggestion = suggestions.find((s: { name: string }) => s.name === value) || {}
      activateTag({ ...suggestion, name: value })
    }
  }, [value, activateTag, suggestions])

  const onSuggestionClick = useCallback((entry) => activateTag(entry), [activateTag])

  return (
    <TagSelectorWrapper ref={setTagSelectorRef} closed={suggestions.length === 0}>
      <ModifierButton onClick={onModifierClick} aria-label="Tag Modifier">
        {modifier}
      </ModifierButton>
      <TagInput value={value} setValue={setValue} />
      <AddButton onClick={onAddClick} aria-label="Add Tag">
        Add
      </AddButton>
      {suggestions.length > 0 && (
        <DropdownList tagSelectorRef={tagSelectorRef} entries={suggestions} onClick={onSuggestionClick} />
      )}
    </TagSelectorWrapper>
  )
}
