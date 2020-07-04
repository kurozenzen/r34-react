import React, { useState } from "react";
import { bool, string, func } from "prop-types";
import styled from "styled-components";

import Overlay from "./Overlay";
import { openFullscreen } from "./utils";

const FlexVideo = styled.video`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: block;
  object-fit: contain;
`;

export default function Video(props) {
  const {
    src,
    thumbnail_src,
    isOverlayVisible,
    toggleOverlay,
    toggleDetails,
    areDetailsVisible,
  } = props;

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

    // ~30 fps
    const id = setInterval(() => {
      setTime(Date.now());
      console.log(time);
    }, 34);

    setIntervalId(id);
  };

  const pause = () => {
    videoRef.pause();
    clearInterval(intervalId);
    setIntervalId(-1);
  };

  return (
    <>
      <FlexVideo
        controls={false}
        loop
        src={src}
        alt={src}
        poster={thumbnail_src}
        preload="metadata"
        onClick={toggleOverlay}
        ref={setVideoRef}
      />
      <Overlay
        isVisible={isOverlayVisible}
        isPaused={videoRef.paused}
        currentTime={videoRef.currentTime}
        duration={videoRef.duration}
        onFullscreen={() => openFullscreen(videoRef)}
        togglePlay={() => (videoRef.paused ? play() : pause())}
        toggleDetails={toggleDetails}
        isPlayable
        areDetailsVisible={areDetailsVisible}
      />
    </>
  );
}

Video.propTypes = {
  src: string.isRequired,
  thumbnail_src: string.isRequired,
  toggleDetails: func.isRequired,
  isOverlayVisible: bool.isRequired,
  toggleOverlay: func.isRequired,
  areDetailsVisible: bool.isRequired,
};
