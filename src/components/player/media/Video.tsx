import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NO_OP } from '../../../data/types'
import { selectAutoPlay, selectPreloadVideos } from '../../../redux/selectors'
import MediaProps from './MediaProps'
import { Overlay } from '../Overlay'
import { PostVideo } from './StyledMedia'
import { useAutoplay } from '../../../hooks/useAutoplay'

export default function Video(props: MediaProps) {
  const {
    viewSrc,
    fullSrc,
    onLoad = NO_OP,
    index,
    width,
    height,
    detailsVisible,
    isFullscreen,
    isActive,
    onFinished
  } = props

  const [playState, setPlayState] = useState(false)

  const [overlayVisible, setOverlayVisible] = React.useState(true)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  const autoPlay = useAutoplay(videoRef)

  const preload = useSelector(selectPreloadVideos) ? 'auto' : 'metadata'
  const prefAutoplay = useSelector(selectAutoPlay)

  const play = React.useCallback(async () => {
    if (videoRef?.paused) {
      try {
        await videoRef.play()
        setPlayState(true)
      } catch (err) {
        if ((err as DOMException).message.includes("user didn't interact with the document first")) {
          // Modern browsers prevent playing of videos before the use has interacted with the page in some form
          console.warn('Autoplay failed because the user did not interact with the page first:', err)
        } else if ((err as DOMException).message.includes('play() request was interrupted by a call to pause()')) {
          // This happens when you scrollfast with autoplay enabled.
          // The videos attempt to play but before they actually start you already scroll on
          // and they get paused as they move offscreen.
          console.warn('Play was interrupted by pause', err)
        } else {
          console.error('Failed to start video:', err)
        }
      }
    }
  }, [videoRef])

  const pause = React.useCallback(() => {
    if (!videoRef?.paused) {
      try {
        videoRef?.pause()
        setPlayState(false)
      } catch (err) {
        console.error('Failed to start video:', err)
      }
    }
  }, [videoRef])

  const handleSeek = React.useCallback(
    (value: number) => {
      if (videoRef) {
        videoRef.currentTime = value
      }
    },
    [videoRef]
  )

  // user play
  const togglePlay: React.MouseEventHandler = React.useCallback(
    (e) => {
      e.stopPropagation()
      if (videoRef) {
        if (videoRef.paused) {
          play()
          setOverlayVisible(false)
        } else {
          pause()
        }
      }
    },
    [pause, play, videoRef]
  )

  // automatic play/pause
  React.useEffect(() => {
    // in fullscreen mode autoplay is on by default
    if (prefAutoplay || isFullscreen) {
      if (autoPlay) {
        play()
        setOverlayVisible(false)
      }
    }

    if (!autoPlay) {
      pause()
    }
  }, [autoPlay, isFullscreen, pause, play, prefAutoplay])

  return (
    <>
      <PostVideo
        data-testid='video'
        controls={false}
        loop={!isFullscreen}
        preload={preload}
        ref={setVideoRef}
        onLoadedMetadata={onLoad}
        width={width}
        height={height}
        src={viewSrc}
      />
      <Overlay
        type='video'
        index={index}
        fullSrc={fullSrc}
        isPaused={!playState}
        duration={videoRef?.duration || 0}
        onTogglePaused={togglePlay}
        onSeek={handleSeek}
        videoRef={videoRef}
        isVisible={playState === false || detailsVisible || overlayVisible}
        setVisible={setOverlayVisible}
        isFullscreen={isFullscreen}
        onFinished={onFinished}
        isActive={isActive}
      />
    </>
  )
}
