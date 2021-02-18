import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import { TagType } from "../../data/types";
import TypeIcon from "../../icons/TypeIcon";
import { formatCount } from "../../misc/formatting";
import { prettifyTagname } from "../tag/tagUtils";

interface EntryProps {
  name: string;
  posts: number;
  types: TagType[];
  onClick: MouseEventHandler;
}

const EntryWrapper = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 48px 1fr auto;
    height: ${theme.dimensions.blockHeight};
    background: white;
    align-items: center;

    > :first-child {
      text-align: center;
    }

    :focus {
      text-decoration: underline;
    }
  `
);

export default function DropdownListEntry(props: EntryProps) {
  const { name, posts, types, onClick } = props;

  return (
    <EntryWrapper onClick={onClick}>
      <TypeIcon types={types} />
      <span style={{ flexGrow: 1 }}>{prettifyTagname(name)}</span>
      <span style={{ paddingRight: 5 }}>{formatCount(posts)} posts</span>
    </EntryWrapper>
  );
}
