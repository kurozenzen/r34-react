import React, { useEffect, useState } from 'react'
import { NO_OP } from '../../../data/types'
import MediaProps from './MediaProps'
import Overlay from '../Overlay'
import { PostImage } from './StyledMedia'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import { useSelector } from 'react-redux'
import { selectAutoPlay } from '../../../redux/selectors'
import { useIsScrolling } from '../../../hooks/useIsScrolling'

export default function Gif(props: MediaProps) {
  const { src, thumbnail_src, onLoad = NO_OP, postId, width, height } = props

  const autoPlay = useSelector(selectAutoPlay)

  const [isPaused, setPaused] = useState(true)
  const [gifRef, setGifRef] = useState<HTMLImageElement | null>(null)

  const [isOnScreen] = useIsOnScreen(gifRef)
  const isScrolling = useIsScrolling()

  const usedSource = isPaused ? thumbnail_src : src

  useEffect(() => {
    if (autoPlay && isOnScreen && !isScrolling) {
      setPaused(false)
    }
  }, [autoPlay, isOnScreen, isScrolling])

  useEffect(() => {
    if (!isOnScreen) {
      setPaused(true)
    }
  }, [isOnScreen])

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
        isPlayable
        isPaused={isPaused}
        togglePlay={() => {
          setPaused(!isPaused)
        }}
        postId={postId}
      />
    </>
  )
}
