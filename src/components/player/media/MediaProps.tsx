interface MediaProps {
  onLoad?: () => void
  index: number
  width: number
  height: number
  thumbnailSrc: string
  viewSrc: string
  fullSrc: string
  detailsVisible: boolean
  isFullscreen: boolean
}

export default MediaProps
