import React from 'react'
import { NO_OP } from '../../../data/types'
import { Overlay } from '../Overlay'
import { PostImage } from './StyledMedia'

interface PictureProps {
  viewSrc: string
  fullSrc: string
  onLoad?: () => void
  width: number
  height: number
  postId: number
}

export default function Picture(props: PictureProps) {
  const { viewSrc, fullSrc, postId, onLoad = NO_OP, width, height } = props

  return (
    <>
      <PostImage
        data-testid='image'
        src={viewSrc}
        alt={viewSrc}
        onLoad={onLoad}
        loading='lazy'
        width={width}
        height={height}
      />
      <Overlay type='image' fullSrc={fullSrc} postId={postId} isVisible={true} setVisible={NO_OP} />
    </>
  )
}
