import * as r34 from 'r34-types'
import React from 'react'
import Picture from './media/Picture'
import Gif from './media/Gif'
import Video from './media/Video'
import { useSources } from '../../hooks/useSources'

type MediaProps = {
  type: r34.PostType
  postId: number
  thumbnailSrc: string
  sampleSrc: string
  fullSrc: string
  onLoad: () => void
  width: number
  height: number
  detailsVisible: boolean
}

export function Media(props: MediaProps) {
  const { type, thumbnailSrc, sampleSrc, fullSrc, postId, onLoad, width, height, detailsVisible } = props
  const [preview, src] = useSources(type, thumbnailSrc, sampleSrc, fullSrc)

  switch (type) {
    case 'image':
      return <Picture viewSrc={src} fullSrc={fullSrc} onLoad={onLoad} postId={postId} width={width} height={height} />
    case 'gif':
      return (
        <Gif
          detailsVisible={detailsVisible}
          viewSrc={src}
          thumbnailSrc={preview}
          fullSrc={fullSrc}
          onLoad={onLoad}
          postId={postId}
          width={width}
          height={height}
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
          postId={postId}
          width={width}
          height={height}
        />
      )
  }
}
