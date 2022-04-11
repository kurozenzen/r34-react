import { useCallback } from 'react'
import { removeSupertag, setTagsOfSupertag } from '../client/firebase'
import * as r34 from 'r34-types'

export const useSupertag = (supertag: r34.Supertag) => {
  const addTag = useCallback(
    (newTag: r34.AnyBiasedTag) => {
      const tag = newTag as r34.BiasedTag
      const newTags = { ...supertag.tags, [tag.name]: tag.modifier }
      setTagsOfSupertag(supertag.name, newTags)
    },
    [supertag.name, supertag.tags]
  )
  const removeTag = useCallback(
    (tag: r34.AnyTag) => {
      const newTags = { ...supertag.tags }
      delete newTags[tag.name]
      setTagsOfSupertag(supertag.name, newTags)
    },
    [supertag.name, supertag.tags]
  )
  const deleteSupertag = useCallback(() => removeSupertag(supertag.name), [supertag.name])

  return [addTag, removeTag, deleteSupertag] as const
}
