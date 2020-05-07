import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { ExpandIcon, CloseIcon, PlayIcon, PauseIcon } from "../../icons/Icons";
import styled from "styled-components";
import { accentColor } from "../../misc/style";

const FlexVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const MediaWrapper = styled.div`
  border: 1px solid black;
  display: inline-block;
  position: relative;
`;

export default function Media({
  type,
  src,
  thumbnail_src,
  isFullscreen,
  onFullscreen,
  onClick,
}) {
  const isPlayable = type === "video" || src.includes(".gif");
  /**
   * @type [HTMLVideoElement, Function]
   */
  const [videoRef, setVideoRef] = useState({});
  const [paused, setPaused] = useState(true);
  const usedSource =
    isPlayable && type === "image" && paused ? thumbnail_src : src;

  console.log(isPlayable, type, paused);

  useEffect(() => {
    if (videoRef && videoRef.play) {
      paused ? videoRef.pause() : videoRef.play();
    }
  }, [paused, videoRef]);

  return (
    <MediaWrapper>
      {type === "video" ? (
        <FlexVideo
          controls={false}
          loop
          src={usedSource}
          alt={src}
          poster={thumbnail_src}
          preload="metadata"
          onClick={onClick}
          ref={setVideoRef}
          onKeyDown={(e) => e.keyCode === 32 && onClick(e)}
        />
      ) : (
        <FlexImage
          src={usedSource}
          alt={src}
          onClick={onClick}
          onKeyDown={(e) => e.keyCode === 32 && onClick(e)}
        />
      )}
      <Button type={"topLeft"} onClick={onFullscreen} label="Toggle Fullscreen">
        {isFullscreen ? (
          <CloseIcon color="white" />
        ) : (
          <ExpandIcon color="white" />
        )}
      </Button>
      {isPlayable && (
        <>
          <Button type="center">
            {paused ? (
              <PlayIcon
                color="white"
                size={50}
                onClick={() => setPaused(false)}
              />
            ) : (
              <PauseIcon
                color="transparent"
                size={50}
                onClick={() => setPaused(true)}
              />
            )}
          </Button>
          <div
            style={{
              height: 5,
              backgroundColor: accentColor,
              width: videoRef
                ? (videoRef.currentTime / videoRef.duration) * 100 + "%"
                : 0,
            }}
          ></div>
        </>
      )}
    </MediaWrapper>
  );
}
