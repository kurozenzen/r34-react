import React from "react";
import { formatSource } from "../../../misc/formatting";
import { ExternalLinkIcon, SourceIcon } from "../../../icons/Icons";

export default (props: { value: string }) =>
  props.value.startsWith("http") ? (
    <a
      href={props.value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
    >
      <ExternalLinkIcon color="red" left />
      {formatSource(props.value)}
    </a>
  ) : (
    <span>
      <SourceIcon color="white" left />
      {props.value}
    </span>
  );
