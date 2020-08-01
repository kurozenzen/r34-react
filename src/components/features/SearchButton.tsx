import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { BLOCK } from "../../data/types";
import { getResults } from "../../redux/actions";
import Button from "../common/Button";

export default function SearchButton() {
  const dispatch = useDispatch();

  const search = useCallback(() => {
    dispatch(getResults());
  }, [dispatch]);

  return (
    <Button type={BLOCK} onClick={search} label="Search">
      Search
    </Button>
  );
}
