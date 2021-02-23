import { TagsState } from "./reducers/tags";
import { ResultsState } from "./reducers/results";
import { PreferencesState } from "./reducers/preferences";
import { ReaderState } from "./reducers/reader";

interface RootState {
  results: ResultsState;
  preferences: PreferencesState;
  tags: TagsState;
  reader: ReaderState;
}

export const selectActiveTags = (state: RootState) => state.tags.active;
export const selectResults = (state: RootState) => state.results;
export const selectPosts = (state: RootState) => state.results.posts;
export const selectCount = (state: RootState) => state.results.count;
export const selectPageNumber = (state: RootState) => state.results.pageNumber;
export const selectPreferences = (state: RootState) => state.preferences;
export const selectInfinite = (state: RootState) => state.preferences.infinite;
export const selectOriginals = (state: RootState) =>
  state.preferences.originals;
export const selectRated = (state: RootState) => state.preferences.rated;
export const selectRatedThreshold = (state: RootState) =>
  state.preferences.ratedTreshold;
export const selectCookies = (state: RootState) => state.preferences.cookies;

export const selectAliases = (state: RootState) =>
  Object.values(state.tags.aliases).flat();
export const selectHasResults = (state: RootState) =>
  Object.keys(state.results.posts).length !== 0;
export const selectOutOfResults = (state: RootState) =>
  Object.keys(state.results.posts).length === state.results.count;

export const selectAliasesByTagName = (tagName: string) => (state: RootState) =>
  state.tags.aliases[tagName];

export const selectFullsceenState = (state: RootState) =>
  state.reader.isEnabled;

export const selectFullsceenPostId = (state: RootState) => state.reader.postId;
