import React, { useMemo } from "react";
import Video from "./Video";
import Gif from "./Gif";
import Picture from "./Picture";

import { getMediaType } from "./utils";
import { GIF, PostType, VIDEO } from "../../data/types";

interface PlayerProps {
  type: PostType;
  src: string;
  thumbnail_src: string;
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
  const { type, src, thumbnail_src, onLoad } = props;

  const externalSrc = new URL(src).searchParams.get("url") || "";

  const media = useMemo(() => {
    const MediaComponent = getMedia(type, src);
    return (
      <MediaComponent
        src={src}
        thumbnail_src={thumbnail_src}
        onLoad={onLoad}
        externalSrc={externalSrc}
      />
    );
  }, [type, src, thumbnail_src, onLoad, externalSrc]);

  return <>{media}</>;
}
