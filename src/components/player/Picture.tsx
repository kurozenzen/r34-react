import React, { MouseEventHandler } from "react";
import FlexImage from "./FlexImage";
import Overlay from "./Overlay";

interface PictureProps {
  src: string;
  onLoad: () => void;
  openInNewTab: MouseEventHandler;
}

export default function Picture(props: PictureProps) {
  const { src, onLoad, openInNewTab } = props;

  return (
    <>
      <FlexImage src={src} alt={src} onLoad={onLoad} loading="lazy" />
      <Overlay isPlayable={false} openInNewTab={openInNewTab} />
    </>
  );
}
