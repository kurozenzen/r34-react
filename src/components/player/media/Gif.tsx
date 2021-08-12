import React, { useEffect, useState } from 'react'
import { NO_OP } from '../../../data/types'
import MediaProps from './MediaProps'
import { Overlay } from '../Overlay'
import { PostImage } from './StyledMedia'
import { useSelector } from 'react-redux'
import { selectPreloadGifs } from '../../../redux/selectors'
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
  const [gifRef, setGifRef] = useState<HTMLImageElement | null>(null)
  const autoPlay = useAutoplay(gifRef)

  const isPlaying = userPlay === null ? autoPlay : userPlay

  // Preloading
  const preload = useSelector(selectPreloadGifs)

  const usedSource = isPlaying ? viewSrc : thumbnailSrc

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
        isVisible={!isPlaying || overlayVisible || detailsVisible}
        setVisible={setOverlayVisible}
        type='gif'
        fullSrc={fullSrc}
        index={index}
        isPaused={!isPlaying}
        onTogglePaused={togglePlay}
        isFullscreen={isFullscreen}
        onFinished={onFinished}
        isActive={isActive}
      />
    </>
  )
}
