import produce from 'immer'
import TagDataClass from '../../data/Tag'
import { ADD_TAG, AppAction, REMOVE_TAG, ADD_ALIASES } from '../actions'

export interface TagsState {
  active: Record<string, TagDataClass>
  aliases: Record<string, TagDataClass[]>
}

export const initialTagsState: TagsState = {
  active: {},
  aliases: {},
}

const addTag = (state: TagsState, newTag: TagDataClass) =>
  produce(state, (draft) => {
    draft.active[newTag.name] = { ...state.active[newTag.name], ...newTag }
  })

const addAliases = (state: TagsState, aliases: TagDataClass[], forTag: string) =>
  produce(state, (draft) => {
    draft.aliases[forTag] = aliases
  })

const removeTag = (state: TagsState, tagToRemove: TagDataClass) =>
  produce(state, (draft) => {
    delete draft.active[tagToRemove.name]
    delete draft.aliases[tagToRemove.name]
  })

const tags = (state: TagsState = initialTagsState, action: AppAction): TagsState => {
  switch (action.type) {
    case ADD_TAG:
      return addTag(state, action.tag)
    case REMOVE_TAG:
      return removeTag(state, action.tag)
    case ADD_ALIASES:
      return addAliases(state, action.aliases, action.forTag)
    default:
      return state
  }
}

export default tags
