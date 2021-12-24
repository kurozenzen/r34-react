import {
  TagType,
  Tag,
  TagModifier,
  BiasedTag,
  Supertag,
  TagsError,
  QueryTag,
} from "r34-types"

const removeLeadingHastag = (value: string) =>
  value[0] === "#" ? value.substr(1) : value
const isInteresting = (tagType: TagType) =>
  !["general", "ambiguous"].includes(tagType)
export const getInterestingType = (types: TagType[]) =>
  types.find(isInteresting)

//#region Typing
export const bias = (tag: Tag, modifier: TagModifier): BiasedTag => ({
  ...tag,
  modifier,
})
export const isBiased = (tag: Tag | BiasedTag): tag is BiasedTag =>
  (tag as BiasedTag).modifier !== undefined
export const isSupertag = (tag: unknown): tag is Supertag =>
  (tag as Supertag).tags !== undefined
export const isSuggestionError = (value: unknown): value is TagsError =>
  (value as TagsError).message !== undefined
//#endregion

//#region Compression
export function encodeSupertag(supertag: Supertag) {
  const payload = `${encodeURI(supertag.name)}/${encodeURI(
    supertag.description
  )}/${encodeURI(
    Object.entries(supertag.tags)
      .map(([t, m]) => `${t},${m}`)
      .join(";")
  )}`

  return Buffer.from(payload).toString("base64")
}

export function decodeSupertag(base64: string) {
  const payload = Buffer.from(removeLeadingHastag(base64), "base64").toString()
  const parts = payload.split("/").map(decodeURI)
  const supertag: Supertag = {
    name: parts[0],
    description: parts[1],
    tags: Object.fromEntries(parts[2].split(";").map((e) => e.split(","))),
  }

  return supertag
}
//#endregion

//#region Tag serialization

/**
 * Accepts a map of all tags and serializes them into a string that can be used as a Querystring parameter
 */
export function serializeAllTags(tags: Record<string, QueryTag | Supertag>) {
  const resolvedTags = flattenSupertags(Object.values(tags))
  const tagsByModifier = groupTagsByModifier(resolvedTags)
  const normalTags = [...tagsByModifier["+"], ...tagsByModifier["-"]]
    .map(serializeTag)
    .join(" + ")
  const optionalTags =
    tagsByModifier["~"].length > 0
      ? ` + ( ${tagsByModifier["~"].map(serializeTag).join(" ~ ")} )`
      : ""

  return `${normalTags}${optionalTags}`
}

/**
 * Accepts a list that holds normal tags and supertags and unpacks all supertags.
 * The result contains all normal tags given plus all contents of the supertags given.
 */
export function flattenSupertags(tags: Array<QueryTag | Supertag>) {
  let resolvedTags: QueryTag[] = []

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
export function groupTagsByModifier(tags: QueryTag[]) {
  return tags.reduce(
    (result, current) => {
      if (!(current.modifier in result)) result[current.modifier] = []

      result[current.modifier]?.push(current)

      return result
    },
    { "+": [], "-": [], "~": [] } as Record<TagModifier, QueryTag[]>
  )
}

/**
 * Serializes a tag for use in urls
 */
export function serializeTag(tag: QueryTag) {
  return `${tag.modifier === "-" ? "-" : ""}${serializeTagname(tag.name)}`
}

/**
 * Serializes tag names for use in api requests.
 */
export function serializeTagname(tagname: string) {
  return encodeURIComponent(tagname.toLowerCase().replace(/ /g, "_"))
}

//#endregion
