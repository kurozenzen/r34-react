import React, { useMemo } from 'react'
import Video from './media/Video'
import Gif from './media/Gif'
import Picture from './media/Picture'

import { getMediaType } from '../../data/utils'
import { MediaType, PostType } from '../../data/types'
import { useSelector } from 'react-redux'
import PostDataClass from '../../data/PostDataClass'
import { selectPostById } from '../../redux/selectors'

interface PlayerProps {
  postId: number
  type: PostType
  src: string
  thumbnail_src: string
  onLoad: () => void
  width: number
  height: number
}

const getMedia = (type: PostType, post: PostDataClass) => {
  switch (getMediaType(type, post)) {
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

  const post = useSelector(selectPostById(postId)) as PostDataClass

  const MediaComponent = getMedia(type, post)

  const [usedThumbnail, usedSrc] = useMemo(() => {
    if (getMediaType(type, post) === MediaType.GIF) {
      // Choose the bigger image that is not a gif
      const thumbnail = post.small_src.includes('.gif') ? thumbnail_src : post.small_src

      // fallback to big_src in case the sample is not a gif
      const source = src.includes('.gif') ? src : post.big_src

      return [thumbnail, source]
    }

    return [thumbnail_src, src]
  }, [post, src, thumbnail_src, type])

  return (
    <MediaComponent
      src={usedSrc}
      thumbnail_src={usedThumbnail}
      onLoad={onLoad}
      postId={postId}
      width={width}
      height={height}
    />
  )
}
