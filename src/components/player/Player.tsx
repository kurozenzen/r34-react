import React, { MouseEventHandler, useMemo } from "react";
import styled from "styled-components";
import Video from "./Video";
import Gif from "./Gif";
import Picture from "./Picture";
import { VIDEO, GIF } from "../../data/constants";
import { getMediaType } from "./utils";
import { PostType } from "../../data/types";

const PlayerWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

interface PlayerProps {
  type: PostType;
  src: string;
  thumbnail_src: string;
  toggleDetails: MouseEventHandler;
  onLoad: () => void;
}

const getMedia = (type: PostType, src: string) => {
  switch (getMediaType(type, src)) {
    case VIDEO:
      return Video;
    case GIF:
      return Gif;
    default:
      return Picture;
  }
};

export default function Player(props: PlayerProps) {
  const { toggleDetails, type, src, thumbnail_src, onLoad } = props;

  const media = useMemo(() => {
    const MediaComponent = getMedia(type, src);
    return (
      <MediaComponent src={src} thumbnail_src={thumbnail_src} onLoad={onLoad} />
    );
  }, [type, src, thumbnail_src, onLoad]);

  return <PlayerWrapper onClick={toggleDetails}>{media}</PlayerWrapper>;
}
