import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NO_OP } from '../../../data/types'
import { selectAutoPlay, selectPreloadVideos } from '../../../redux/selectors'
import MediaProps from './MediaProps'
import Overlay from '../Overlay'
import { PostVideo } from './StyledMedia'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import { useIsScrolling } from '../../../hooks/useIsScrolling'

export default function Video(props: MediaProps) {
  const { src, onLoad = NO_OP, postId, width, height } = props

  const autoPlay = useSelector(selectAutoPlay)

  const [userPlay, setUserPlay] = useState<boolean | null>(null)

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
    if (videoRef) {
      if (videoRef.paused) {
        play()
        setUserPlay(true)
      } else {
        pause()
        setUserPlay(false)
      }
    }
  }, [videoRef, play, pause])

  const preload = useSelector(selectPreloadVideos) ? 'auto' : 'metadata'

  const [isOnScreen] = useIsOnScreen(videoRef)
  const isScrolling = useIsScrolling()

  useEffect(() => {
    if (videoRef && autoPlay && videoRef.paused && isOnScreen && !isScrolling && userPlay !== false) {
      play()
    }
  }, [autoPlay, isOnScreen, isScrolling, play, userPlay, videoRef])

  useEffect(() => {
    if (videoRef && !videoRef.paused && !isOnScreen) {
      pause()
    }
  }, [isOnScreen, pause, userPlay, videoRef])

  return (
    <>
      <PostVideo
        data-testid='video'
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
