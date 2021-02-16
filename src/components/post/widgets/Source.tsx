import React from "react";
import { formatSource } from "../../../misc/formatting";
import { LinkIcon, SourceIcon, TwitterIcon } from "../../../icons/Icons";
import styled, { css } from "styled-components";

export default (props: { value: string }) => {
  return props.value.startsWith("http") ? (
    props.value.includes("twitter") ? (
      <TwitterLink value={props.value} />
    ) : (
      <a
        href={props.value}
        target="_blank"
        rel="noopener noreferrer"
        className="source"
      >
        <LinkIcon color="red" left />
        {formatSource(props.value)}
      </a>
    )
  ) : (
    <span>
      <SourceIcon color="white" left />
      {props.value}
    </span>
  );
};

const ColoredA = styled.a(
  (props) => css`
    color: ${props.color} !important;
  `
);

const TwitterLink = ({ value }: { value: string }) => {
  return (
    <ColoredA
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
      color="rgb(29, 161, 242)"
    >
      <TwitterIcon color="rgb(29, 161, 242)" left />
      {value.split("twitter.com/")[1].split(" ")[0].split("?")[0].split("/")[0]}
    </ColoredA>
  );
};
