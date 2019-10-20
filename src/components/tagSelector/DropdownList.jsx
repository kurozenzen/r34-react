import React from "react";
import { array, object } from "prop-types";
import styled from "styled-components";
import TypeIcon from "../../icons/TypeIcon";
import format from "../../misc/numberFormatting";

function sizeAndPosition({ inputRef }) {
  return inputRef
    ? `
    top: ${inputRef.getBoundingClientRect().top + inputRef.clientHeight}px;
    left: ${inputRef.getBoundingClientRect().left}px;
    width: ${inputRef.clientWidth}px;
    `
    : "";
}

const ListWrapper = styled.div`
  position: absolute;
  ${sizeAndPosition};
  background: white;
  border-radius: 0 0 3px 3px;
  color: black;
  z-index: 1;
`;

function DropdownList({ inputRef, entries, onClick }) {
  return (
    <ListWrapper inputRef={inputRef}>
      {entries.map(entry => (
        <Entry
          key={entry.name}
          {...entry}
          onClick={() => onClick(entry)}
        ></Entry>
      ))}
    </ListWrapper>
  );
}

const EntryWrapper = styled.div`
  display: flex;
  border-top: 1px grey solid;
  padding: 2px 0;
`;

const EntryType = styled(TypeIcon)`
  flex: 0 0 26px;
  padding: 0 5px;
`;

function Entry({ name, posts, types, onClick }) {
  return (
    <EntryWrapper onClick={onClick}>
      <EntryType types={types} />

      <span style={{ flexGrow: 1 }}>{name}</span>
      <span style={{ paddingRight: 5 }}>{format(posts)} posts</span>
    </EntryWrapper>
  );
}

DropdownList.propTypes = {
  inputRef: object,
  entries: array
};

export default DropdownList;
