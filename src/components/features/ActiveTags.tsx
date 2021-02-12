import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectActiveTags } from "../../redux/selectors";
import TagList from "../tag/TagList";

export default function ActiveTags({ onChange }: { onChange: () => void }) {
  const activeTags = useSelector(selectActiveTags);

  useEffect(() => {
    onChange();
  }, [onChange, activeTags]);

  return Object.keys(activeTags).length > 0 ? (
    <TagList tags={activeTags} loadAliases />
  ) : null;
}
