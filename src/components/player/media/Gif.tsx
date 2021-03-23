import React, { useState } from 'react'
import { NO_OP } from '../../../data/types'
import MediaProps from './MediaProps'
import Overlay from '../Overlay'
import { PostImage } from './StyledMedia'

export default function Gif(props: MediaProps) {
  const { src, thumbnail_src, onLoad = NO_OP, postId, width, height } = props

  const [isPaused, setPaused] = useState(true)
  const usedSource = isPaused ? thumbnail_src : src

  return (
    <>
      <PostImage src={usedSource} alt={usedSource} loading='lazy' onLoad={onLoad} width={width} height={height} />
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
