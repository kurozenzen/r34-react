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
  onFinished?: () => void
  onBack?: () => void
  isActive: boolean
}

export default MediaProps
