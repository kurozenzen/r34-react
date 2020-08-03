import React, { useState } from "react";
import styled from "styled-components";
import Overlay from "./Overlay";

const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: block;
  object-fit: contain;
`;

interface GifProps {
  src: string;
  thumbnail_src: string;
}

export default function Gif(props: GifProps) {
  const { src, thumbnail_src } = props;

  const [isPaused, setPaused] = useState(true);
  const usedSource = isPaused ? thumbnail_src : src;

  return (
    <>
      <FlexImage src={usedSource} alt={usedSource} loading="lazy" />
      <Overlay
        isPlayable
        isPaused={isPaused}
        togglePlay={(event) => {
          event.stopPropagation();
          setPaused(!isPaused);
        }}
      />
    </>
  );
}
