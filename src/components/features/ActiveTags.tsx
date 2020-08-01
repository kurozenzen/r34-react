import React from "react";
import { useSelector } from "react-redux";
import { selectActiveTags } from "../../redux/selectors";
import TagList from "../tag/TagList";

export default function ActiveTags() {
  const activeTags = useSelector(selectActiveTags);

  return Object.keys(activeTags).length > 0 ? (
    <TagList tags={activeTags} loadAliases />
  ) : null;
}
