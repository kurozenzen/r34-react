import React from 'react'
import { NO_OP } from '../../../data/types'
import { Overlay } from '../Overlay'
import { PostImage } from './StyledMedia'

interface PictureProps {
  viewSrc: string
  fullSrc: string
  onLoad?: () => void
  width: number
  height: number
  index: number
  isFullscreen: boolean
  onFinished?: () => void
  onBack?: () => void
  isActive: boolean
}

export default function Picture(props: PictureProps) {
  const { viewSrc, fullSrc, index, onLoad = NO_OP, width, height, isFullscreen, isActive, onFinished, onBack } = props

  return (
    <>
      <PostImage
        data-testid='image'
        src={viewSrc}
        alt={viewSrc}
        onLoad={onLoad}
        loading='lazy'
        width={width}
        height={height}
      />
      <Overlay
        type='image'
        fullSrc={fullSrc}
        index={index}
        isVisible={true}
        setVisible={NO_OP}
        isFullscreen={isFullscreen}
        onFinished={onFinished}
        onBack={onBack}
        isActive={isActive}
      />
    </>
  )
}
