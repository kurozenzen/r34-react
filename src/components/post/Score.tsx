import React from "react";
import { HeartIcon } from "../../icons/Icons";
import FlexPair from "../common/FlexPair";

export default (props: { value: number }) => (
  <FlexPair>
    <HeartIcon color="white" />
    <span>{props.value}</span>
  </FlexPair>
);
