import React from "react";
import { array, string } from "prop-types";
import { CharacterIcon, CopyrightIcon, ArtistIcon } from "./Icons";

function TypeIcon({ types, className, onClick }) {
  const interestingType = types.find(t => !t.match(/^[general|ambiguous]$/));

  switch (interestingType) {
    case "character":
      return <CharacterIcon className={className} onClick={onClick} left />;
    case "copyright":
      return <CopyrightIcon className={className} onClick={onClick} left />;
    case "artist":
      return <ArtistIcon className={className} onClick={onClick} left />;
    default:
      return <div className={className}></div>;
  }
}

TypeIcon.propTypes = {
  types: array,
  className: string
};

TypeIcon.defaultProps = {
  types: []
};

export default TypeIcon;
