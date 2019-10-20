import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { ExpandIcon, CloseIcon } from "../../icons/Icons";

const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FlexVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Media({
  type,
  src,
  thumbnail_src,
  isFullscreen,
  onFullscreen,
  onClick
}) {
  const [hasMoved, setMoved] = useState();
  const onMove = useCallback(() => {
    setMoved(true);
  }, []);
  const onRelease = useCallback(
    event => {
      if (!hasMoved) {
        onClick(event);
      }
      setMoved(false);
    },
    [hasMoved, onClick]
  );

  return type === "video" ? (
    <FlexVideo
      controls
      loop
      src={src}
      alt={src}
      poster={thumbnail_src}
      preload="none"
      onClick={onClick}
      onTouchMove={onMove}
      onTouchEnd={onRelease}
    />
  ) : (
    <>
      <Button type={"topLeft"} onClick={onFullscreen}>
        {isFullscreen ? (
          <CloseIcon color="white" />
        ) : (
          <ExpandIcon color="white" />
        )}
      </Button>
      <FlexImage src={src} alt={src} onClick={onClick} />
    </>
  );
}
