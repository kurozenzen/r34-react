import * as r34 from 'r34-types'
import React from 'react'
import Picture from './media/Picture'
import Gif from './media/Gif'
import Video from './media/Video'
import { useSources } from '../../hooks/useSources'

type MediaProps = {
  type: r34.PostType
  index: number
  thumbnailSrc: string
  sampleSrc: string
  fullSrc: string
  onLoad: () => void
  width: number
  height: number
  detailsVisible: boolean
  isFullscreen?: boolean
  onBack?: () => void
  onFinished?: () => void
  isActive?: boolean
}

export function Media(props: MediaProps) {
  const {
    type,
    thumbnailSrc,
    sampleSrc,
    fullSrc,
    index,
    onLoad,
    width,
    height,
    detailsVisible,
    isFullscreen = false,
    onBack,
    onFinished,
    isActive = false,
  } = props
  const [preview, src] = useSources(type, thumbnailSrc, sampleSrc, fullSrc)

  switch (type) {
    case 'image':
      return (
        <Picture
          viewSrc={src}
          fullSrc={fullSrc}
          onLoad={onLoad}
          index={index}
          width={width}
          height={height}
          isFullscreen={isFullscreen}
          onFinished={onFinished}
          onBack={onBack}
          isActive={isActive}
        />
      )
    case 'gif':
      return (
        <Gif
          detailsVisible={detailsVisible}
          viewSrc={src}
          thumbnailSrc={preview}
          fullSrc={fullSrc}
          onLoad={onLoad}
          index={index}
          width={width}
          height={height}
          isFullscreen={isFullscreen}
          onFinished={onFinished}
          onBack={onBack}
          isActive={isActive}
        />
      )
    case 'video':
      return (
        <Video
          detailsVisible={detailsVisible}
          viewSrc={src}
          thumbnailSrc={preview}
          fullSrc={fullSrc}
          onLoad={onLoad}
          index={index}
          width={width}
          height={height}
          isFullscreen={isFullscreen}
          onFinished={onFinished}
          onBack={onBack}
          isActive={isActive}
        />
      )
  }
}
