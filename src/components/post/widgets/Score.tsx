import React from "react";
import { HeartIcon } from "../../../icons/Icons";
import IconAndText from "../../common/IconAndText";

export default (props: { value: number }) => (
  <IconAndText>
    <HeartIcon color="white" />
    <span>{props.value}</span>
  </IconAndText>
);
