import React from "react";
import { arrayOf, shape, string } from "prop-types";
import Tag from "../tag/Tag";

export function TagList({ tags, activeTags, loadAliases, dispatch }) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Tag
          key={"t_" + tag.name}
          {...tag}
          activeTags={activeTags}
          loadAliases={loadAliases}
          dispatch={dispatch}
        />
      ))}
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
  onItemItemClick: () => {}
};

export default TagList;
