import React from "react";
import { array, object } from "prop-types";
import styled from "styled-components";
import TypeIcon from "../../icons/TypeIcon";
import format from "../../misc/numberFormatting";
import { prettifyTagname } from "../tag/tagUtils";
import { accentColor, borderWidth } from "../../misc/style";

function sizeAndPosition({ inputRef }) {
  return inputRef
    ? `
      position: absolute;
      top: ${inputRef.offsetTop + inputRef.clientHeight - 2}px;
      left: ${inputRef.offsetLeft}px;
      width: ${inputRef.clientWidth}px;`
    : "";
}

export const ListWrapper = styled.div`
  ${sizeAndPosition};
  display: none;
  background: white;
  box-sizing: border-box;
  border: ${borderWidth} ${accentColor} solid;
  border-radius: 0 0 3px 3px;
  color: black;
  z-index: 1;
`;

function DropdownList({ inputRef, entries, onClick }) {
  return entries && entries.length > 0 ? (
    <ListWrapper inputRef={inputRef}>
      {entries.map(entry => (
        <Entry
          key={entry.name}
          {...entry}
          onClick={() => onClick(entry)}
        ></Entry>
      ))}
    </ListWrapper>
  ) : null;
}

const EntryWrapper = styled.div`
  display: flex;
  height: 28px;

  > * {
    margin: auto;
  }

  &:not(:last-child) {
    border-bottom: 1px grey solid;
  }

  :focus {
    text-decoration: underline;
  }
`;

const TypeWrapper = styled.span`
  flex: 0 0 48px;
  text-align: center;
`;

function Entry({ name, posts, types, onClick }) {
  return (
    <EntryWrapper
      onClick={onClick}
      onKeyDown={e => e.keyCode === 32 && onClick(e)}
      tabIndex="0"
    >
      <TypeWrapper>
        <TypeIcon types={types} />
      </TypeWrapper>

      <span style={{ flexGrow: 1 }}>{prettifyTagname(name)}</span>
      <span style={{ paddingRight: 5 }}>{format(posts)} posts</span>
    </EntryWrapper>
  );
}

DropdownList.propTypes = {
  inputRef: object,
  entries: array
};

export default DropdownList;
