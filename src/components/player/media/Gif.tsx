import React, { useEffect, useState } from 'react'
import { NO_OP } from '../../../data/types'
import MediaProps from './MediaProps'
import { Overlay } from '../Overlay'
import { PostImage } from './StyledMedia'
import { useSelector } from 'react-redux'
import { selectAutoPlay, selectPreloadGifs } from '../../../redux/selectors'
import { useAutoplay } from '../../../hooks/useAutoplay'

export default function Gif(props: MediaProps) {
  const {
    viewSrc,
    thumbnailSrc,
    fullSrc,
    onLoad = NO_OP,
    index,
    width,
    height,
    detailsVisible,
    isFullscreen,
    onFinished,
    isActive,
  } = props

  const [overlayVisible, setOverlayVisible] = React.useState(true)

  // user play
  const [playState, setPlayState] = useState(false)

  // auto play
  const [gifRef, setGifRef] = useState<HTMLImageElement | null>(null)
  const prefAutoplay = useSelector(selectAutoPlay)
  const autoPlay = useAutoplay(gifRef)
  // Preloading
  const preload = useSelector(selectPreloadGifs)

  const usedSource = playState ? viewSrc : thumbnailSrc

  const play = React.useCallback(async () => {
    setPlayState(true)
  }, [])

  const pause = React.useCallback(() => {
    setPlayState(false)
  }, [])

  const togglePlay: React.MouseEventHandler = React.useCallback(
    (e) => {
      e.stopPropagation()
      if (playState) {
        setPlayState(false)
      } else {
        setPlayState(true)
        setOverlayVisible(false)
      }
    },
    [playState]
  )

  React.useEffect(() => {
    if (prefAutoplay || isFullscreen) {
      if (autoPlay) {
        setPlayState(true)
        setOverlayVisible(false)
      }
    }

    if (!autoPlay) {
      setPlayState(false)
    }
  }, [autoPlay, isFullscreen, pause, play, prefAutoplay])

  useEffect(() => {
    if (preload) {
      const loader = new Image()
      loader.src = viewSrc
    }
  })

  return (
    <>
      <PostImage
        data-testid='gif'
        ref={setGifRef}
        src={usedSource}
        alt={usedSource}
        loading='lazy'
        onLoad={onLoad}
        width={width}
        height={height}
      />

      <Overlay
        isVisible={!playState || overlayVisible || detailsVisible}
        setVisible={setOverlayVisible}
        type='gif'
        fullSrc={fullSrc}
        index={index}
        isPaused={!playState}
        onTogglePaused={togglePlay}
        isFullscreen={isFullscreen}
        onFinished={onFinished}
        isActive={isActive}
      />
    </>
  )
}
