import React from 'react'
import { NO_OP } from '../../../data/types'
import MediaProps from './MediaProps'
import Overlay from '../Overlay'
import { PostImage } from './StyledMedia'

export default function Picture(props: MediaProps) {
  const { src, onLoad = NO_OP, postId, width, height } = props

  return (
    <>
      <PostImage src={src} alt={src} onLoad={onLoad} loading='lazy' width={width} height={height} />
      <Overlay isPlayable={false} postId={postId} />
    </>
  )
}
