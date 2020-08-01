import { Modifier, SimpleMap } from "../data/types";
import TagDataClass from "../data/Tag";
import { PreferencesState } from "../redux/reducers/preferences";

const SEARCH = "r34_search";
const ADD_TAG = "r34_add_tag";

interface SearchEvent {
  id: typeof SEARCH;
  payload: {
    tags: string[];
  };
}

interface TagActivateEvent {
  id: typeof ADD_TAG;
  payload: {
    name: string;
    modifier: Modifier | undefined;
  };
}

export const searchEvent = (
  activeTags: SimpleMap<TagDataClass>,
  page_number: number,
  preferences: PreferencesState
) => ({
  id: SEARCH,
  payload: {
    active_tags: Object.values(activeTags)
      .map((tag) => `${tag.modifier}${tag.name}`)
      .sort(),
    page_number,
    preferences,
  },
});

export const addTagEvent = (tag: TagDataClass) => ({
  id: ADD_TAG,
  payload: {
    name: tag.name,
    modifier: tag.modifier,
  },
});

export type EventType = SearchEvent | TagActivateEvent;
