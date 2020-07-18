import React, { useState } from "react";
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

interface VideoProps {
  src: string;
  thumbnail_src: string;
}

export default function Video(props: VideoProps) {
  const { src, thumbnail_src } = props;

  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const [time, setTime] = useState(Date.now());
  const [intervalId, setIntervalId] = useState(0);

  const play = () => {
    videoRef && videoRef.play();

    // ~30 fps
    const id = setInterval(() => {
      setTime(Date.now());
      console.log(time);
    }, 34);

    setIntervalId(id);
  };

  const pause = () => {
    videoRef && videoRef.pause();
    clearInterval(intervalId);
    setIntervalId(-1);
  };

  return (
    <>
      <FlexVideo
        controls={false}
        loop
        src={src}
        poster={thumbnail_src}
        preload="metadata"
        ref={setVideoRef}
      />
      <Overlay
        isPaused={videoRef ? videoRef.paused : true}
        currentTime={videoRef ? videoRef.currentTime : undefined}
        duration={videoRef ? videoRef.duration : undefined}
        onFullscreen={() => videoRef && openFullscreen(videoRef)}
        togglePlay={(event) => {
          event.stopPropagation();
          videoRef && (videoRef.paused ? play() : pause());
        }}
        isPlayable
      />
    </>
  );
}
