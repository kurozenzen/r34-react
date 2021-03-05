import React from 'react'
import Video from './media/Video'
import Gif from './media/Gif'
import Picture from './media/Picture'

import { getMediaType } from '../../data/utils'
import { MediaType, PostType } from '../../data/types'

interface PlayerProps {
  postId: number
  type: PostType
  src: string
  thumbnail_src: string
  onLoad: () => void
  width: number
  height: number
}

const getMedia = (type: PostType, src: string) => {
  switch (getMediaType(type, src)) {
    case MediaType.VIDEO:
      return Video
    case MediaType.GIF:
      return Gif
    default:
      return Picture
  }
}

export default function Player(props: PlayerProps) {
  const { type, src, thumbnail_src, onLoad, postId, width, height } = props

  const MediaComponent = getMedia(type, src)

  return (
    <MediaComponent
      src={src}
      thumbnail_src={thumbnail_src}
      onLoad={onLoad}
      postId={postId}
      width={width}
      height={height}
    />
  )
}
