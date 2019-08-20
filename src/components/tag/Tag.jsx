import React from "react";
import { arrayOf, bool, func, number, string } from "prop-types";
import "./Tag.css";

function Tag({ name, count, modifier, types, active, onClick }) {
  const onAction = () => onClick({ name, count, types, modifier });

  const exclude = modifier === "-";
  const character = types.includes("character");
  const artist = types.includes("artist");

  return (
    <span
      className={
        "badge badge-tag" +
        (active ? " active" : "") +
        (exclude ? " exclude" : "") +
        (character ? " character" : "") +
        (artist ? " artist" : "")
      }
      onClick={onAction}
    >
      {count ? `${name} (${count})` : name}
    </span>
  );
}

Tag.propTypes = {
  name: string,
  count: number,
  modifier: string,
  types: arrayOf(string),
  active: bool,
  onClick: func
};

export default Tag;
