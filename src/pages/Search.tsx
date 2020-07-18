import React from "react";
import { useSelector } from "react-redux";
import Config from "../components/features/Config";
import Results from "../components/features/Results";
import { selectHasResults } from "../redux/selectors";

export default function Search() {
  const hasResults = useSelector(selectHasResults);

  return (
    <>
      <Config />
      {hasResults && <Results />}
    </>
  );
}
