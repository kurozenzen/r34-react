import React, { useCallback } from "react";
import styled from "styled-components";

let hasMoved = false;

const FlexVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Video({ src, thumbnail_src, onClick }) {
  const touchEnd = useCallback(
    e => {
      !hasMoved && onClick();
      hasMoved = false;
    },
    [onClick]
  );

  const touchMove = useCallback(() => {
    hasMoved = true;
  }, []);

  return (
    <FlexVideo
      controls
      loop
      src={src}
      alt={src}
      poster={thumbnail_src}
      preload="metadata"
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      onKeyDown={e => e.keyCode === 32 && onClick(e)}
    />
  );
}
