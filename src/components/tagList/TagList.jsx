import React from "react";
import { arrayOf, func, object } from "prop-types";
import Tag from "../tag/Tag";

export function TagList({ tags, activeTags, onItemClick }) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Tag
          key={"t_" + tag.name}
          {...tag}
          active={isTagActive(tag, activeTags)}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

TagList.propTypes = {
  tags: arrayOf(object),
  onItemClick: func
};

export default TagList;

function isTagActive(tag, activeTags) {
  return activeTags.some(t => t.name === tag.name);
}
