interface MediaProps {
  src: string
  thumbnail_src: string
  onLoad?: () => void
  postId: number
  width: number
  height: number
}

export default MediaProps
