import PostDataClass from './PostDataClass'
import TagDataClass from './TagDataClass'
import { PostType, MediaType } from './types'

export const getMediaType = (type: PostType, post: PostDataClass) => {
  if (type === PostType.VIDEO) {
    return MediaType.VIDEO
  }

  // can't use .endsWith because of queryString
  if (post.small_src.includes('.gif') || post.big_src.includes('.gif')) {
    return MediaType.GIF
  }

  return MediaType.PICTURE
}

export function getUrlParameter(src: string) {
  return new URL(src).searchParams.get('url') || ''
}

/**
 * Converts a list of objects into a map.
 * @param list The original list
 * @param keyProp The keyProp parameter defines which property of the objects will be used as the index for the map
 */
export const listToMap = <T>(list: T[], keyProp: string): Record<string, T> => {
  return list.reduce((result: Record<string, T>, current: any) => {
    result[current[keyProp]] = current
    return result
  }, {})
}

/**
 * Joins tags together for analytics event
 */
export function tagsToString(tags: Record<string, TagDataClass>) {
  return Object.values(tags)
    .map((tag) => `${tag.modifier}${tag.name}`)
    .sort()
}

/**
 * Returns a URL object when the value is a hyperlink. Else undefined
 */
export function parseUrl(value: string) {
  try {
    return new URL(value)
  } catch (err) {
    return undefined
  }
}

/**
 * converts a version like "1.2.7" into 127
 */
export function versionToNumber(majorMinorPatch: string) {
  return Number(majorMinorPatch.split('.').join(''))
}

/**
 * Hacky ass way to download images cross origin. Could solve this by hosting both the app and the api on the same domain.
 */
export function download(url: string) {
  const filename = url.split('/').pop() || ''

  fetch(url, {
    headers: new Headers({
      Origin: window.location.origin,
    }),
    mode: 'cors',
  })
    .then((response) => response.blob())
    .then((blob) => {
      var a = document.createElement('a')
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
    .catch((e) => console.error(e))
}

/**
 * Returns the current version of the project
 */
export function getVersion() {
  // Some browsers fail to get environment variables. In that case return unknown.
  if (process?.env?.REACT_APP_VERSION) {
    return process.env.REACT_APP_VERSION
  }

  return 'unknown'
}

/**
 * Render ready version.
 */
export function getVersionString() {
  const version = getVersion()

  return version === 'unknown' ? 'Latest Release' : `Version ${version}`
}

/**
 * Returns the correct source based on preferences
 */
export function getCorrectSource(loadOriginal: boolean, useCorsProxy: boolean, big_src: string, small_src: string) {
  const source = loadOriginal ? big_src : small_src
  return useCorsProxy ? source : getUrlParameter(source)
}

export function boolToNumber(value: boolean) {
  return value ? 1 : 0
}
