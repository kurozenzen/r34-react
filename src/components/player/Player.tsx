import React, { useMemo } from 'react'
import Video from './Video'
import Gif from './Gif'
import Picture from './Picture'

import { getMediaType, getUrlParameter } from './utils'
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

  const externalSrc = useMemo(() => getUrlParameter(src), [src])
  const MediaComponent = getMedia(type, src)

  return (
    <MediaComponent
      src={src}
      thumbnail_src={thumbnail_src}
      onLoad={onLoad}
      externalSrc={externalSrc}
      postId={postId}
      width={width}
      height={height}
    />
  )
}
