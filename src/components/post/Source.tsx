import React from "react";
import styled, { css } from "styled-components";
import {
  DeviantArtIcon,
  LinkIcon,
  PatreonIcon,
  PixivIcon,
  SourceIcon,
  TwitterIcon,
} from "../../icons/Icons";
import { formatSource } from "../../misc/formatting";
import FlexPair from "../common/FlexPair";

const ColoredA = styled.a(
  (props) => css`
    color: ${props.color} !important;
    display: flex;
    gap: ${props.theme.dimensions.spacing};
  `
);

interface SourceProps {
  value: string;
}

export default function Source({ value }: SourceProps) {
  if (value.startsWith("http")) {
    if (value.includes("twitter.com")) {
      return <TwitterLink value={value} />;
    }

    if (value.includes("pixiv.net")) {
      return <PixivSource value={value} />;
    }

    if (value.includes("patreon.com")) {
      return <PatreonLink value={value} />;
    }

    if (value.includes("deviantart.com")) {
      return <DeviantArtLink value={value} />;
    }

    return <DefaultLink value={value} />;
  }

  return <FallbackSource value={value} />;
}

const FallbackSource = ({ value }: SourceProps) => {
  return (
    <FlexPair>
      <SourceIcon color="white" />
      <span>{value}</span>
    </FlexPair>
  );
};

const DefaultLink = ({ value }: SourceProps) => {
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
    >
      <LinkIcon color="red" left />
      {formatSource(value)}
    </a>
  );
};

const TwitterLink = ({ value }: SourceProps) => {
  return (
    <ColoredA
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
      color="rgb(29, 161, 242)"
    >
      <TwitterIcon color="rgb(29, 161, 242)" />
      {value.split("twitter.com/")[1].split(" ")[0].split("?")[0].split("/")[0]}
    </ColoredA>
  );
};

const DeviantArtLink = ({ value }: SourceProps) => {
  return (
    <ColoredA
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
      color="#00e59b"
    >
      <DeviantArtIcon color="#00e59b" />
      {
        value
          .split("deviantart.com/")[1]
          .split(" ")[0]
          .split("?")[0]
          .split("/")[0]
      }
    </ColoredA>
  );
};

const PatreonLink = ({ value }: SourceProps) => {
  return (
    <ColoredA
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
      color="#FF424D"
    >
      <PatreonIcon color="#FF424D" />
      {value.split("patreon.com/")[1].split(" ")[0].split("?")[0].split("/")[0]}
    </ColoredA>
  );
};

const PixivSource = ({ value }: SourceProps) => {
  return (
    <ColoredA
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="source"
      color="#0096FA"
    >
      <PixivIcon color="#0096FA" left />
      <span>Pixiv</span>
    </ColoredA>
  );
};
