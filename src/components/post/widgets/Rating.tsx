import { RatingType } from "../../../data/types";
import React from "react";
import { RatingIcon } from "../../../icons/Icons";
import IconAndText from "../../common/IconAndText";

export default (props: { value: RatingType }) => (
  <IconAndText>
    <RatingIcon color="white" />
    <span>{props.value[0].toUpperCase()}</span>
  </IconAndText>
);
