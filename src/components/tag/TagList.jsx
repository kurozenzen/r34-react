import React from "react";
import { arrayOf, shape, string } from "prop-types";
import styled from "styled-components";
import Tag from "../tag/Tag";
import { spacing } from "../../misc/style";

export const TagListWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin: ${({ padding }) => `calc(${padding} - ${spacing})`};
`;

export function TagList({ tags, activeTags, loadAliases, dispatch, padding }) {
  return (
    <div>
      <TagListWrapper padding={padding}>
        {tags.map(tag => (
          <Tag
            key={"t_" + tag.name}
            {...tag}
            activeTags={activeTags}
            loadAliases={loadAliases}
            dispatch={dispatch}
          />
        ))}
      </TagListWrapper>
    </div>
  );
}

TagList.propTypes = {
  tags: arrayOf(
    shape({
      name: string
    })
  ).isRequired,
  activeTags: arrayOf(
    shape({
      name: string
    })
  )
};

TagList.defaultProps = {
  activeTags: [],
  onItemClick: () => {},
  onItemItemClick: () => {},
  padding: "0px"
};

export default TagList;
