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
  `
);

const Name = styled.span`
  grid-column: 2/3;
`;

const Count = styled.span`
  grid-column: 3/4;
`;

const Icon = styled.div`
  grid-column: 1/2;
  text-align: center;
`;

export default function DropdownListEntry(props: EntryProps) {
  const { name, posts, types, onClick } = props;

  return (
    <EntryWrapper onClick={onClick}>
      <Icon>
        <TypeIcon types={types} />
      </Icon>
      <Name>{prettifyTagname(name)}</Name>
      <Count>{formatCount(posts)} posts</Count>
    </EntryWrapper>
  );
}
