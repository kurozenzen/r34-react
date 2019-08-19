import React from "react";
import { number, string } from "prop-types";
import "./Tag.css";

function Tag({ name, count, modifier, types, active, onClick }) {
  const onAction = () => onClick({ name, count, types, modifier });
  return (
    <span
      className={
        "badge badge-tag" +
        (active ? " active" : " ") +
        (modifier === "-" ? " exclude" : " ")
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
  modifier: string
};

export default Tag;
