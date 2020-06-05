import React, { useState } from "react";
import Button from "../common/Button";
import { ExpandIcon, PlayIcon, PauseIcon } from "../../icons/Icons";
import styled, { css } from "styled-components";
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

const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
};

const ProgressBar = styled.div(
  ({ currentTime, duration }) => css`
    height: 5px;
    background-color: ${accentColor};
    width: ${(currentTime / duration) * 100}%;
  `
);

export default function Media({ type, src, thumbnail_src, onClick }) {
  const isPlayable = type === "video" || src.includes(".gif");
  /** @type [HTMLVideoElement, Function] */

  const [videoRef, setVideoRef] = useState({
    paused: true,
    play: () => {},
    pause: () => {},
    currentTime: 0,
    duration: 1,
  });

  const [time, setTime] = useState(Date.now());
  const [intervalId, setIntervalId] = useState(0);

  const play = () => {
    videoRef.play();
    const id = setInterval(() => {
      setTime(Date.now());
      console.log(time);
    }, 32);
    setIntervalId(id);
  };

  const pause = () => {
    videoRef.pause();
    clearInterval(intervalId);
    setIntervalId(-1);
  };

  const usedSource =
    isPlayable && type === "image" && videoRef.paused ? thumbnail_src : src;

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
      <Button
        type={"topLeft"}
        onClick={() => openFullscreen(videoRef)}
        label="Open Fullscreen"
      >
        <ExpandIcon color="white" />
      </Button>
      {isPlayable && (
        <>
          <Button type="center" onClick={videoRef.paused ? play : pause}>
            {videoRef.paused ? (
              <PlayIcon color="white" size={50} />
            ) : (
              <PauseIcon color="white" size={50} />
            )}
          </Button>
          <ProgressBar
            currentTime={videoRef.currentTime}
            duration={videoRef.duration}
          />
        </>
      )}
    </MediaWrapper>
  );
}
