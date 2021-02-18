import { RatingType } from "../../data/types";
import React from "react";
import { RatingIcon } from "../../icons/Icons";
import FlexPair from "../common/FlexPair";

export default (props: { value: RatingType }) => (
  <FlexPair>
    <RatingIcon color="white" />
    <span>{props.value[0].toUpperCase()}</span>
  </FlexPair>
);
