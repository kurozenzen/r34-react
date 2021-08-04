import produce from 'immer'
import { AliasTag, AnyBiasedTag } from 'r34-types'
import { ADD_TAG, AppAction, REMOVE_TAG, ADD_ALIASES } from '../actions'

export interface TagsState {
  active: Record<string, AnyBiasedTag>
  aliases: Record<string, AliasTag[]>
}

const initialTagsState: TagsState = {
  active: {},
  aliases: {},
}

const addTag = (state: TagsState, newTag: AnyBiasedTag) =>
  produce(state, (draft) => {
    draft.active[newTag.name] = { ...state.active[newTag.name], ...newTag }
  })

const addAliases = (state: TagsState, aliases: AliasTag[], forTag: string) =>
  produce(state, (draft) => {
    draft.aliases[forTag] = aliases
  })

const removeTag = (state: TagsState, tagName: string) =>
  produce(state, (draft) => {
    delete draft.active[tagName]
    delete draft.aliases[tagName]
  })

const tags = (state: TagsState = initialTagsState, action: AppAction): TagsState => {
  switch (action.type) {
    case ADD_TAG:
      return addTag(state, action.tag)
    case REMOVE_TAG:
      return removeTag(state, action.tagName)
    case ADD_ALIASES:
      return addAliases(state, action.aliases, action.forTag)
    default:
      return state
  }
}

export default tags
