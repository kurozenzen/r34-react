import { PostType, VIDEO, GIF, PICTURE } from "../../data/types"

export const openFullscreen = (elem: HTMLVideoElement) => {
  elem.requestFullscreen()
}

export const getMediaType = (type: PostType, src: string) => {
  if (type === VIDEO) {
    return VIDEO
  }

  // can't use .endsWith because of queryString
  if (src.includes(".gif")) {
    return GIF
  }

  return PICTURE
}
