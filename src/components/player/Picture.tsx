import React from "react"
import { NO_OP } from "../../data/types"
import FlexImage from "./FlexImage"
import Overlay from "./Overlay"

interface PictureProps {
  src: string
  onLoad?: () => void
  externalSrc: string
  postId: number
}

export default function Picture(props: PictureProps) {
  const { src, onLoad = NO_OP, externalSrc, postId } = props

  return (
    <>
      <FlexImage src={src} alt={src} onLoad={onLoad} loading="lazy" />
      <Overlay isPlayable={false} externalSrc={externalSrc} postId={postId} />
    </>
  )
}
