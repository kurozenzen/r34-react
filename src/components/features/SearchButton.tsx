import React from "react";
import useAction from "../../hooks/useAction";
import { getResults } from "../../redux/actions";
import { BlockButton } from "../common/Buttons";

export default function SearchButton() {
  const search = useAction(getResults);

  return (
    <BlockButton onClick={search} aria-label="Search">
      Search
    </BlockButton>
  );
}
