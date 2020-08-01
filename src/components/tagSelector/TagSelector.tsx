import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import api from "../../misc/api";
import { prepareTag } from "../../misc/prepare";
import Button, { AddButton, ModifierButton } from "../common/Button";
import TagInput from "./TagInput";
import DropdownList from "./DropdownList";
import { normalizeTagname } from "../tag/tagUtils";
import { useDispatch } from "react-redux";
import { addTag } from "../../redux/actions";
import { ThemeType } from "../../misc/theme";

export const TagSelectorWrapper = styled.div(
  (props: {
    closed: boolean;
    ref: (ref: HTMLInputElement) => void;
    theme: ThemeType;
  }) => css`
    display: flex;
    background: white;
    ${props.closed
      ? `border-radius: ${props.theme.dimensions.borderRadius};`
      : `
        border-radius: ${props.theme.dimensions.borderRadius} ${props.theme.dimensions.borderRadius} 0 0;

        > ${AddButton} {
          border-radius: 0 ${props.theme.dimensions.borderRadius} 0 0;
        }

        > ${ModifierButton} {
          border-radius: ${props.theme.dimensions.borderRadius} 0 0 0;
        }
      `}
  `
);

export default function TagSelector() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [modifier, setModifier] = useState("+");
  const [suggestions, setSuggestions] = useState([]);

  const [tagSelectorRef, setTagSelectorRef] = useState<HTMLDivElement | null>(
    null
  );

  const activateTag = useCallback(
    (suggestion) => {
      dispatch(
        addTag(
          prepareTag({
            name: suggestion.name,
            modifier: modifier,
            count: suggestion.posts,
            types: suggestion.types,
          })
        )
      );

      setValue("");
      setSuggestions([]);
    },
    [dispatch, modifier]
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      if (value && value !== "")
        api.getTags(normalizeTagname(value)).then((newSuggestions) => {
          setSuggestions(newSuggestions);
        });
    }, 400);

    return () => clearTimeout(handle);
  }, [value]);

  const onModifierClick = useCallback(
    () => setModifier(modifier === "+" ? "-" : "+"),
    [modifier, setModifier]
  );

  const onAddClick = useCallback(() => {
    if (value && value.trim() !== "") {
      const suggestion =
        suggestions.find((s: { name: string }) => s.name === value) || {};
      activateTag({ ...suggestion, name: value });
    }
  }, [value, activateTag, suggestions]);

  return (
    <TagSelectorWrapper
      ref={setTagSelectorRef}
      closed={suggestions.length === 0}
    >
      <Button type="modifier" onClick={onModifierClick} label="Tag Modifier">
        {modifier}
      </Button>
      <TagInput value={value} setValue={setValue} />
      <Button type="add" onClick={onAddClick} label="Add Tag">
        Add
      </Button>
      {suggestions.length > 0 && (
        <DropdownList
          tagSelectorRef={tagSelectorRef}
          entries={suggestions}
          onClick={(entry) => activateTag(entry)}
        />
      )}
    </TagSelectorWrapper>
  );
}
