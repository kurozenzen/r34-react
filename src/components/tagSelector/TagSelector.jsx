import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { func } from "prop-types";
import api from "../../misc/api";
import prepare from "../../misc/prepare";
import Button, { AddButton, ModifierButton } from "../common/Button";
import TagInput from "./TagInput";
import DropdownList, { ListWrapper } from "./DropdownList";
import { borderRadius } from "../../misc/style";
import { normalizeTagname } from "../tag/tagUtils";

export const TagSelectorWrapper = styled.div`
  display: flex;
  background: white;
  ${({ closed }) =>
    closed
      ? `border-radius: ${borderRadius};`
      : `
        border-radius: ${borderRadius} ${borderRadius} 0 0;

        > ${AddButton} {
          border-radius: 0 ${borderRadius} 0 0;
        }

        > ${ModifierButton} {
          border-radius: ${borderRadius} 0 0 0;
        }
      `}
  :focus-within {
    ${ListWrapper} {
      display: block;
    }
  }
`;

function TagSelector({ dispatch }) {
  const [inputRef, setInputRef] = useState();
  const [value, setValue] = useState("");
  const [modifier, setModifier] = useState("+");
  const [suggestions, setSuggestions] = useState([]);

  const addTag = useCallback(
    (suggestion) => {
      dispatch({
        type: "ADD_TAG",
        tag: prepare({
          name: suggestion.name,
          modifier: modifier,
          count: suggestion.posts,
          types: suggestion.types,
        }),
      });

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

  return (
    <TagSelectorWrapper ref={setInputRef} closed={suggestions.length === 0}>
      <Button
        type="modifier"
        onClick={() => setModifier(modifier === "+" ? "-" : "+")}
      >
        {modifier}
      </Button>
      <TagInput value={value} setValue={setValue} />
      <Button
        type="add"
        onClick={() => {
          if (value && value.trim() !== "") {
            const suggestion = suggestions.find((s) => s.name === value) || {};
            addTag({ ...suggestion, name: value });
          }
        }}
      >
        Add
      </Button>
      <DropdownList
        inputRef={inputRef}
        entries={suggestions}
        onClick={(entry) => {
          addTag(entry);
        }}
      ></DropdownList>
    </TagSelectorWrapper>
  );
}

TagSelector.propTypes = {
  onSubmitTag: func,
};

export default TagSelector;
