import React from 'react'
import { NO_OP } from '../../data/types'
import FlexImage from './FlexImage'
import MediaProps from './MediaProps'
import Overlay from './Overlay'

export default function Picture(props: MediaProps) {
  const { src, onLoad = NO_OP, externalSrc, postId, width, height } = props

  return (
    <>
      <FlexImage src={src} alt={src} onLoad={onLoad} loading='lazy' width={width} height={height} />
      <Overlay isPlayable={false} externalSrc={externalSrc} postId={postId} />
    </>
  )
}
