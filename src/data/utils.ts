import TagDataClass from './Tag'

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
