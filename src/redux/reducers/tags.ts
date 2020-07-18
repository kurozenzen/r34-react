import produce from "immer";
import TagDataClass from "../../data/Tag";
import { SimpleMap } from "../../data/types";
import { ADD_TAG, AppAction, REMOVE_TAG, TOGGLE_TAG } from "../actions";

export interface TagsState {
  active: SimpleMap<TagDataClass>;
}

export const initialTagsState: TagsState = {
  active: {},
};

const addTag = (state: TagsState, newTag: TagDataClass) =>
  produce(state, (draft) => {
    draft.active[newTag.name] = { ...state.active[newTag.name], ...newTag };
  });

const removeTag = (state: TagsState, tagToRemove: TagDataClass) =>
  produce(state, (draft) => {
    delete draft.active[tagToRemove.name];
  });

const toggleTag = (state: TagsState, tagToToggle: TagDataClass) =>
  state.active[tagToToggle.name]
    ? removeTag(state, tagToToggle)
    : addTag(state, tagToToggle);

export default (
  state: TagsState = initialTagsState,
  action: AppAction
): TagsState => {
  switch (action.type) {
    case ADD_TAG:
      return addTag(state, action.tag);
    case REMOVE_TAG:
      return removeTag(state, action.tag);
    case TOGGLE_TAG:
      return toggleTag(state, action.tag);
    default:
      return state;
  }
};
