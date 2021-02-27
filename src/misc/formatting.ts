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
 * @param {String} sourceString
 */
export const formatSource = (sourceString: string) => {
  if (
    sourceString.includes('http:') ||
    sourceString.includes('https:') ||
    sourceString.includes('www.') ||
    sourceString.includes('.com')
  ) {
    let semiSanitized = sourceString
      .replace(/https?:\/\//, '')
      .replace(/ww[w\d]\./, '')
      .replace('.com', '')
      .replace('.org', '')
      .replace('.net', '')

    return semiSanitized.substring(0, semiSanitized.indexOf('/'))
  } else {
    return sourceString
  }
}

export function formatDuration(duration: number) {
  const min = Math.trunc(duration / 60)
  const sec = Math.trunc(duration % 60)

  return min + ':' + (sec < 10 ? '0' : '') + sec
}

export function formatTagname(tagname: string) {
  return tagname.replace(/_/g, ' ')
}

export function serializeTagname(tagname: string) {
  return tagname.toLowerCase().replace(/ /g, '_')
}

export function formatTagnameAndCount(name: string, count?: number | null) {
  return count ? `${formatTagname(name)} (${formatCount(count)})` : formatTagname(name)
}
