import React from "react";
import styled from "styled-components";
import Overlay from "./Overlay";

const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: block;
  object-fit: contain;
`;

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
