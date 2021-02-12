import React from "react";
import FlexImage from "./FlexImage";
import Overlay from "./Overlay";

interface PictureProps {
  src: string;
  onLoad: () => void;
}

export default function Picture(props: PictureProps) {
  const { src, onLoad } = props;

  return (
    <>
      <FlexImage src={src} alt={src} onLoad={onLoad} loading="lazy" />
      <Overlay isPlayable={false} />
    </>
  );
}
