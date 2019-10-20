import React from "react";
import { array, string } from "prop-types";
import { CharacterIcon, CopyrightIcon, ArtistIcon } from "./Icons";

function TypeIcon({ types, className, onClick }) {
  const interestingType = types.find(t => !t.match(/^[general|ambiguous]$/));

  switch (interestingType) {
    case "character":
      return <CharacterIcon onClick={onClick} left />;
    case "copyright":
      return <CopyrightIcon onClick={onClick} left />;
    case "artist":
      return <ArtistIcon onClick={onClick} left />;
    default:
      return null;
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
