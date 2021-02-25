import React, { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { selectPreferences } from "../../redux/selectors"
import FlexVideo from "./FlexVideo"
import MediaProps from "./MediaProps"
import Overlay from "./Overlay"

export default function Video(props: MediaProps) {
  const { src, onLoad, externalSrc, postId, width, height } = props

  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  const [, setTime] = useState(Date.now())
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const play = useCallback(() => {
    videoRef && videoRef.play()

    // ~30 fps
    const id = setInterval(() => {
      setTime(Date.now())
    }, 34)

    setIntervalId(id)
  }, [videoRef])

  const pause = useCallback(() => {
    videoRef && videoRef.pause()
    clearInterval(intervalId as NodeJS.Timeout)
    setIntervalId(null)
  }, [videoRef, intervalId])

  const togglePlay = useCallback(
    (event) => {
      event.stopPropagation()
      videoRef && (videoRef.paused ? play() : pause())
    },
    [videoRef, play, pause]
  )

  const { preloadVideos } = useSelector(selectPreferences)

  return (
    <>
      <FlexVideo
        controls={false}
        loop
        preload={preloadVideos ? "auto" : "metadata"}
        ref={setVideoRef}
        onLoad={onLoad}
        width={width}
        height={height}
      >
        <source src={src} />
      </FlexVideo>
      <Overlay
        mediaRef={videoRef}
        isPaused={videoRef ? videoRef.paused : true}
        currentTime={videoRef?.currentTime}
        duration={videoRef?.duration}
        postId={postId}
        togglePlay={togglePlay}
        externalSrc={externalSrc}
        isPlayable
      />
    </>
  )
}
