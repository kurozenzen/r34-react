import { parseUrl } from '../data/utils'

/**
 * Transforms a number into a shortened version for rendering.
 * Useful as it takes up less space.
 */
export const formatCount = (numberString: number) => {
  const number = numberString

  if (number >= 1e6) {
    return `${(number / 1e6).toFixed(0)}M`
  }

  if (number >= 1e3) {
    return `${(number / 1e3).toFixed(0)}K`
  }

  return number
}

/**
 * Formats source strings for rendering
 */
export const formatSource = (source: string) => {
  const url = parseUrl(source)
  return url ? url.host : source
}

/**
 * Seconds to mm:ss formatter
 */
export function formatDuration(duration: number) {
  const min = Math.trunc(duration / 60)
  const sec = Math.trunc(duration % 60)

  return min + ':' + (sec < 10 ? '0' : '') + sec
}

/**
 * Formats tag names for rendering.
 */
export function formatTagname(tagname: string) {
  return tagname
    .replace(/_/g, ' ')
    .replace(/source:/g, ' ')
    .replace(/rating:/g, ' ')
}

/**
 * Serializes tag names for use in api requests.
 */
export function serializeTagname(tagname: string) {
  return tagname.toLowerCase().replace(/ /g, '_')
}

/**
 * Formats tags with their count if possible
 */
export function formatTagnameAndCount(name: string, count?: number | null) {
  return count ? `${formatTagname(name)} (${formatCount(count)})` : formatTagname(name)
}

export function formatDateTime(date: Date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export function formatTime(milliseconds: number) {
  if (milliseconds >= 315576e5) {
    return formatUnit(milliseconds, 315576e5, 'year')
  }
  if (milliseconds >= 26297568e2) {
    return formatUnit(milliseconds, 26297568e2, 'month')
  }

  if (milliseconds >= 6048e5) {
    return formatUnit(milliseconds, 6048e5, 'week')
  }

  if (milliseconds >= 854e5) {
    return formatUnit(milliseconds, 854e5, 'day')
  }

  if (milliseconds >= 36e5) {
    return formatUnit(milliseconds, 36e5, 'hour')
  }

  if (milliseconds >= 6e4) {
    return formatUnit(milliseconds, 6e4, 'minute')
  }

  if (milliseconds >= 1e3) {
    return formatUnit(milliseconds, 1e3, 'second')
  }

  return `${milliseconds} ms`
}

function formatUnit(value: number, unitSize: number, unit: string) {
  const result = (value / unitSize).toFixed(0)

  const unitString = result === '1' ? unit : `${unit}s`

  return `${result} ${unitString}`
}
