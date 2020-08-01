import React from "react";
import styled, { css } from "styled-components";
import TagSelector from "../tagSelector/TagSelector";
import Options from "./Options";
import Title from "../common/Title";
import Surface from "../common/Surface";
import SearchButton from "./SearchButton";
import ActiveTags from "./ActiveTags";

const ConfigWrapper = styled.section(
  (props) => css`
    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

export default function Config() {
  return (
    <ConfigWrapper>
      <Title>
        <label htmlFor="tag-input">Search</label>
      </Title>
      <Surface>
        <TagSelector />
        <ActiveTags />
        <Options />
        <SearchButton />
      </Surface>
    </ConfigWrapper>
  );
}
