import * as r34 from 'r34-types'
import { SuggestionsError } from './types'

//#region Tag serialization

/**
 * Accepts a map of all tags and serializes them into a string that can be used as a Querystring parameter
 */
export function serializeAllTags(tags: Record<string, r34.QueryTag | r34.Supertag>) {
  const resolvedTags = flattenSupertags(Object.values(tags))
  const tagsByModifier = groupTagsByModifier(resolvedTags)
  const normalTags = [...tagsByModifier['+'], ...tagsByModifier['-']].map(serializeTag).join(' + ')
  const optionalTags =
    tagsByModifier['~'].length > 0 ? ` + ( ${tagsByModifier['~'].map(serializeTag).join(' ~ ')} )` : ''

  return `${normalTags}${optionalTags}`
}

/**
 * Accepts a list that holds normal tags and supertags and unpacks all supertags.
 * The result contains all normal tags given plus all contents of the supertags given.
 */
export function flattenSupertags(tags: Array<r34.QueryTag | r34.Supertag>) {
  let resolvedTags: r34.QueryTag[] = []

  tags.forEach((tag) => {
    if (isSupertag(tag)) {
      Object.entries(tag.tags).forEach(([name, modifier]) => {
        resolvedTags.push({ name, modifier })
      })
    } else {
      resolvedTags.push(tag)
    }
  })

  return resolvedTags
}

/**
 * Given a list of tags this function returns a record with an entry for each modifier countaining all tags of the original list that match that modifier.
 */
export function groupTagsByModifier(tags: r34.QueryTag[]) {
  return tags.reduce(
    (result, current) => {
      if (!(current.modifier in result)) result[current.modifier] = []

      result[current.modifier]?.push(current)

      return result
    },
    { '+': [], '-': [], '~': [] } as Record<r34.TagModifier, r34.QueryTag[]>
  )
}

/**
 * Serializes a tag for use in urls
 */
export function serializeTag(tag: r34.QueryTag) {
  return `${tag.modifier === '-' ? '-' : ''}${serializeTagname(tag.name)}`
}

/**
 * Serializes tag names for use in api requests.
 */
export function serializeTagname(tagname: string) {
  return encodeURIComponent(tagname.toLowerCase().replace(/ /g, '_'))
}

//#endregion

//#region Query parameter construction

/**
 * Constructs the tag parameter for getting posts from the api
 */
export function getTagParameter(
  tags: Record<string, r34.QueryTag | r34.Supertag>,
  minScore: number,
  sort: r34.PostsSort
) {
  const tagParts = []

  if (Object.keys(tags).length > 0) {
    tagParts.push(serializeAllTags(tags))
  }

  if (minScore > 0) {
    tagParts.push(encodeURIComponent(`score:>=${minScore}`))
  }

  if (sort) {
    tagParts.push(encodeURIComponent(`sort:${sort}`))
  }

  return tagParts.join(' + ')
}

//#endregion

//#region Typing

export function bias(tag: r34.Tag, modifier: r34.TagModifier): r34.BiasedTag {
  return { ...tag, modifier }
}

export function isBiased(tag: r34.Tag | r34.BiasedTag): tag is r34.BiasedTag {
  return (tag as r34.BiasedTag).modifier !== undefined
}

export function isSupertag(tag: unknown): tag is r34.Supertag {
  return (tag as r34.Supertag).tags !== undefined
}

export function getInterestingType(types: r34.TagType[]) {
  return types.find((t) => !t.match(/^[general|ambiguous]$/))
}

export function isSuggestionError(value: unknown): value is SuggestionsError {
  return (value as SuggestionsError).message !== undefined
}

//#endregion

//#region Compression

function removeLeadingHastag(value: string) {
  if (value[0] === '#') return value.substr(1)
  else return value
}

export function encodeSupertag(supertag: r34.Supertag) {
  const payload = `${encodeURI(supertag.name)}/${encodeURI(supertag.description)}/${encodeURI(
    Object.entries(supertag.tags)
      .map(([t, m]) => `${t},${m}`)
      .join(';')
  )}`

  return Buffer.from(payload).toString('base64')
}

export function decodeSupertag(base64: string) {
  const payload = Buffer.from(removeLeadingHastag(base64), 'base64').toString()

  const parts = payload.split('/').map(decodeURI)

  const supertag: r34.Supertag = {
    name: parts[0],
    description: parts[1],
    tags: Object.fromEntries(parts[2].split(';').map((e) => e.split(','))),
  }

  return supertag
}

//#endregion
