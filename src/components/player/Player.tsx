import React, { useMemo } from 'react'
import Video from './media/Video'
import Gif from './media/Gif'
import Picture from './media/Picture'
import { useSelector } from 'react-redux'
import { selectPostById } from '../../redux/selectors'
import { Post, PostType } from 'r34-types'

interface PlayerProps {
  postId: number
  type: PostType
  src: string
  thumbnail_src: string
  onLoad: () => void
  width: number
  height: number
}

const getMedia = (type: PostType, post: Post) => {
  switch (type) {
    case 'video':
      return Video
    case 'gif':
      return Gif
    default:
      return Picture
  }
}

export default function Player(props: PlayerProps) {
  const { type, src, thumbnail_src, onLoad, postId, width, height } = props

  const post = useSelector(selectPostById(postId))

  const MediaComponent = getMedia(type, post)

  const [usedThumbnail, usedSrc] = useMemo(() => {
    if (type === 'gif') {
      return [post.sample_url, post.file_url]
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
