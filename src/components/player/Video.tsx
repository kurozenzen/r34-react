import React, { useState, useCallback, MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { selectPreferences } from "../../redux/selectors";
import FlexVideo from "./FlexVideo";
import Overlay from "./Overlay";
import { openFullscreen } from "./utils";

interface VideoProps {
  src: string;
  thumbnail_src: string;
  onLoad: () => void;
  openInNewTab: MouseEventHandler;
}

export default function Video(props: VideoProps) {
  const { src, onLoad, openInNewTab } = props;

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

  const { preloadVideos } = useSelector(selectPreferences);

  return (
    <>
      <FlexVideo
        controls={false}
        loop
        src={src}
        preload={preloadVideos ? "auto" : "metadata"}
        ref={setVideoRef}
        onLoadedMetadata={onLoad}
      />
      <Overlay
        isPaused={videoRef ? videoRef.paused : true}
        currentTime={videoRef ? videoRef.currentTime : undefined}
        duration={videoRef ? videoRef.duration : undefined}
        onFullscreen={onFullscreen}
        togglePlay={togglePlay}
        openInNewTab={openInNewTab}
        isPlayable
      />
    </>
  );
}
