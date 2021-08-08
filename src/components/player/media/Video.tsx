import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NO_OP } from '../../../data/types'
import { selectPreloadVideos } from '../../../redux/selectors'
import MediaProps from './MediaProps'
import { Overlay } from '../Overlay'
import { PostVideo } from './StyledMedia'
import { useAutoplay } from '../../../hooks/useAutoplay'

export default function Video(props: MediaProps) {
  const { viewSrc, fullSrc, onLoad = NO_OP, postId, width, height, detailsVisible } = props

  const [overlayVisible, setOverlayVisible] = React.useState(true)

  // user play
  const [userPlay, setUserPlay] = useState<boolean | null>(null)
  const togglePlay: React.MouseEventHandler = React.useCallback(
    (e) => {
      e.stopPropagation()
      setUserPlay(!userPlay)
      setOverlayVisible(false)
    },
    [userPlay]
  )

  // auto play
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const autoPlay = useAutoplay(videoRef)

  const isPlaying = userPlay === undefined ? autoPlay : userPlay

  const preload = useSelector(selectPreloadVideos) ? 'auto' : 'metadata'

  React.useEffect(() => {
    if (isPlaying && videoRef?.paused) {
      videoRef?.play()
    }

    if (!isPlaying && !videoRef?.paused) {
      videoRef?.pause()
    }
  }, [isPlaying, videoRef])

  const handleSeek = React.useCallback(
    (value: number) => {
      if (videoRef) {
        videoRef.currentTime = value
      }
    },
    [videoRef]
  )

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
        src={viewSrc}
      />
      <Overlay
        type='video'
        postId={postId}
        fullSrc={fullSrc}
        isPaused={!isPlaying}
        duration={videoRef?.duration || 0}
        onTogglePaused={togglePlay}
        onSeek={handleSeek}
        videoRef={videoRef}
        isVisible={!isPlaying || detailsVisible || overlayVisible}
        setVisible={setOverlayVisible}
      />
    </>
  )
}
