interface MediaProps {
  onLoad?: () => void
  postId: number
  width: number
  height: number
  thumbnailSrc: string
  viewSrc: string
  fullSrc: string
  detailsVisible: boolean
}

export default MediaProps
