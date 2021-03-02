import React, { useState } from 'react'
import { NO_OP } from '../../../data/types'
import FlexImage from '../FlexImage'
import MediaProps from './MediaProps'
import Overlay from '../Overlay'

export default function Gif(props: MediaProps) {
  const { src, thumbnail_src, onLoad = NO_OP, externalSrc, postId, width, height } = props

  const [isPaused, setPaused] = useState(true)
  const usedSource = isPaused ? thumbnail_src : src

  return (
    <>
      <FlexImage src={usedSource} alt={usedSource} loading='lazy' onLoad={onLoad} width={width} height={height} />
      <Overlay
        isPlayable
        isPaused={isPaused}
        togglePlay={(event) => {
          event.stopPropagation()
          setPaused(!isPaused)
        }}
        externalSrc={externalSrc}
        postId={postId}
      />
    </>
  )
}
