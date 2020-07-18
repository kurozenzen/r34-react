import { RatingType } from "../../../data/types";
import React from "react";
import { RatingIcon } from "../../../icons/Icons";

export default (props: { value: RatingType }) => (
  <span>
    <RatingIcon color="white" left />
    {props.value[0].toUpperCase()}
  </span>
);
