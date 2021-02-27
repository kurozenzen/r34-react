import { PostType, MediaType } from '../../data/types'

export const openFullscreen = (elem: HTMLVideoElement) => {
  elem.requestFullscreen()
}

export const getMediaType = (type: PostType, src: string) => {
  if (type === PostType.VIDEO) {
    return MediaType.VIDEO
  }

  // can't use .endsWith because of queryString
  if (src.includes('.gif')) {
    return MediaType.GIF
  }

  return MediaType.PICTURE
}

export function getUrlParameter(src: string) {
  return new URL(src).searchParams.get('url') || ''
}
