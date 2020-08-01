import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import TypeIcon from "../../icons/TypeIcon";
import { formatCount } from "../../misc/formatting";
import { prettifyTagname } from "../tag/tagUtils";
import TagDataClass from "../../data/Tag";
import { TagType } from "../../data/types";
import { ThemeType } from "../../misc/theme";

function sizeAndPosition(tagSelector: HTMLDivElement | null) {
  if (tagSelector) {
    const { offsetTop, clientHeight, offsetLeft, clientWidth } = tagSelector;

    return `
      position: absolute;
      top: ${offsetTop + clientHeight - 2}px;
      left: ${offsetLeft}px;
      width: ${clientWidth}px;`;
  }

  return "";
}

export const ListWrapper = styled.div(
  (props: { tagSelectorRef: HTMLDivElement | null; theme: ThemeType }) => css`
    ${sizeAndPosition(props.tagSelectorRef)};
    background: white;
    box-sizing: border-box;
    border: ${props.theme.dimensions.borderWidth}
      ${props.theme.colors.accentColor} solid;
    border-radius: 0 0 3px 3px;
    color: black;
    z-index: 1;
  `
);

interface DropdownListProps {
  tagSelectorRef: HTMLDivElement | null;
  entries: {
    name: string;
    posts: number;
    types: TagType[];
  }[];
  onClick: (entry: TagDataClass) => void;
}

export default function DropdownList(props: DropdownListProps) {
  const { tagSelectorRef, entries, onClick } = props;

  return entries && entries.length > 0 ? (
    <ListWrapper tagSelectorRef={tagSelectorRef}>
      {entries.map((entry) => (
        <Entry
          key={entry.name}
          onClick={() => onClick(entry)}
          {...entry}
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

interface EntryProps {
  name: string;
  posts: number;
  types: TagType[];
  onClick: MouseEventHandler;
}

const Entry = (props: EntryProps) => {
  const { name, posts, types, onClick } = props;

  return (
    <EntryWrapper onClick={onClick}>
      <TypeWrapper>
        <TypeIcon types={types} />
      </TypeWrapper>

      <span style={{ flexGrow: 1 }}>{prettifyTagname(name)}</span>
      <span style={{ paddingRight: 5 }}>{formatCount(posts)} posts</span>
    </EntryWrapper>
  );
};
