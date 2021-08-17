import { parseUrl } from '../data/utils'

/**
 * Transforms a number into a shortened version for rendering.
 * Useful as it takes up less space.
 */
export const formatCount = (value: number) => {
  if (value / 1e6 >= 1) {
    return `${Math.trunc(value / 1e6)}M`
  }

  if (value >= 1e3) {
    return `${Math.trunc(value / 1e3)}K`
  }

  return value.toString()
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
    .replace(/source:/g, '')
    .replace(/rating:/g, '')
}

/**
 * Formats tags with their count if possible
 */
export function formatTagnameAndCount(name: string, count?: number) {
  return count ? `${formatTagname(name)} (${formatCount(count)})` : formatTagname(name)
}

const z = (value: number) => (value < 10 ? `0${value}` : value.toString())

/**
 * Returns a string containing date and time of agiven Date object
 */
export function formatDatetime(date: Date) {
  const dd = z(date.getDate())
  const MM = z(date.getMonth() + 1) // zero indexed
  const yyyy = date.getFullYear()
  const hh = z(date.getHours())
  const mm = z(date.getMinutes())

  return `${dd}/${MM}/${yyyy} ${hh}:${mm}`
}

/**
 * Returns a human friendly approximation of a given time
 */
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

export function formatUnit(value: number, unitSize: number, unit: string) {
  const result = (value / unitSize).toFixed(0)

  const unitString = result === '1' ? unit : `${unit}s`

  return `${result} ${unitString}`
}
