import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NO_OP } from '../../../data/types'
import { selectPreloadVideos } from '../../../redux/selectors'
import MediaProps from './MediaProps'
import Overlay from '../Overlay'
import { PostVideo } from './StyledMedia'

export default function Video(props: MediaProps) {
  const { src, onLoad = NO_OP, postId, width, height } = props

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

  const togglePlay = useCallback(() => {
    videoRef && (videoRef.paused ? play() : pause())
  }, [videoRef, play, pause])

  const preload = useSelector(selectPreloadVideos) ? 'auto' : 'metadata'

  return (
    <>
      <PostVideo
        controls={false}
        loop
        preload={preload}
        ref={setVideoRef}
        onLoadedMetadata={onLoad}
        width={width}
        height={height}
        src={src}
      />
      <Overlay
        mediaRef={videoRef}
        isPaused={videoRef ? videoRef.paused : true}
        currentTime={videoRef?.currentTime}
        duration={videoRef?.duration}
        postId={postId}
        togglePlay={togglePlay}
        isPlayable
      />
    </>
  )
}
