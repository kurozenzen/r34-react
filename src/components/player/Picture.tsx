import React from "react";
import FlexImage from "./FlexImage";
import Overlay from "./Overlay";

interface PictureProps {
  src: string;
  onLoad: () => void;
  externalSrc: string;
}

export default function Picture(props: PictureProps) {
  const { src, onLoad, externalSrc } = props;

  return (
    <>
      <FlexImage src={src} alt={src} onLoad={onLoad} loading="lazy" />
      <Overlay isPlayable={false} externalSrc={externalSrc} />
    </>
  );
}
