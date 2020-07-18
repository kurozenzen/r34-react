import React from "react";
import { HeartIcon } from "../../../icons/Icons";

export default (props: { value: number }) => (
  <span>
    {props.value}
    <HeartIcon color="white" right />
  </span>
);
