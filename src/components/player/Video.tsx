import React, { useState, useCallback } from "react";
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
  onLoad: () => void;
}

export default function Video(props: VideoProps) {
  const { src, thumbnail_src, onLoad } = props;

  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const [, setTime] = useState(Date.now());
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    videoRef && videoRef.play();

    // ~30 fps
    const id = setInterval(() => {
      setTime(Date.now());
    }, 34);

    setIntervalId(id);
  }, [videoRef]);

  const pause = useCallback(() => {
    videoRef && videoRef.pause();
    clearInterval(intervalId as NodeJS.Timeout);
    setIntervalId(null);
  }, [videoRef, intervalId]);

  const onFullscreen = useCallback(() => videoRef && openFullscreen(videoRef), [
    videoRef,
  ]);

  const togglePlay = useCallback(
    (event) => {
      event.stopPropagation();
      videoRef && (videoRef.paused ? play() : pause());
    },
    [videoRef, play, pause]
  );

  return (
    <>
      <FlexVideo
        controls={false}
        loop
        src={src}
        poster={thumbnail_src}
        preload="metadata"
        ref={setVideoRef}
        onLoad={onLoad}
      />
      <Overlay
        isPaused={videoRef ? videoRef.paused : true}
        currentTime={videoRef ? videoRef.currentTime : undefined}
        duration={videoRef ? videoRef.duration : undefined}
        onFullscreen={onFullscreen}
        togglePlay={togglePlay}
        isPlayable
      />
    </>
  );
}
