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
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    align-items: center;

    > *:not(:last-child) {
      margin-bottom: ${props.theme.dimensions.gutter};
    }
  `
);

export default function Config(props: { onLoad: () => void }) {
  const { onLoad } = props;

  return (
    <ConfigWrapper>
      <Title>
        <label htmlFor="tag-input">Search</label>
      </Title>
      <Surface>
        <TagSelector />
        <ActiveTags onChange={onLoad} />
        <Options />
        <SearchButton />
      </Surface>
    </ConfigWrapper>
  );
}
