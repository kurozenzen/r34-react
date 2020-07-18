import React from "react";
import styled, { css } from "styled-components";
import TagDataClass from "../../data/Tag";
import Tag from "./Tag";
import { SimpleMap } from "../../data/types";
import { ThemeType } from "../../misc/theme";

export const TagListWrapper = styled.div(
  (props: { padding: boolean; theme: ThemeType }) => css`
    display: inline-flex;
    flex-wrap: wrap;
    margin: calc(
      ${props.padding ? props.theme.dimensions.gutter : "0px"} -
        ${props.theme.dimensions.spacing}
    );
  `
);

interface TagListProps {
  tags: SimpleMap<TagDataClass>;
  loadAliases?: boolean;
  padding?: boolean;
}

export default function TagList(props: TagListProps) {
  const { tags, loadAliases = false, padding = false } = props;

  return (
    <div>
      <TagListWrapper padding={padding}>
        {Object.entries(tags).map(([key, tag]) => (
          <Tag key={key} {...tag} loadAliases={loadAliases} />
        ))}
      </TagListWrapper>
    </div>
  );
}
