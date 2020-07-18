import { TagsState } from "./reducers/tags";
import { MiscState } from "./reducers/misc";
import { ResultsState } from "./reducers/results";
import { PreferencesState } from "./reducers/preferences";

interface RootState {
  misc: MiscState;
  results: ResultsState;
  preferences: PreferencesState;
  tags: TagsState;
}

export const selectActiveMenu = (state: RootState) => state.misc.activeMenu;
export const selectHasResults = (state: RootState) =>
  Object.keys(state.results.posts).length !== 0;
export const selectPreferences = (state: RootState) => state.preferences;
export const selectActiveTags = (state: RootState) => state.tags.active;
export const selectResults = (state: RootState) => state.results;
export const selectAliasesByTagName = (tagName: string) => (
  state: RootState
) => {
  return state.tags.aliases[tagName];
};

export const selectAliases = (state: RootState) =>
  Object.values(state.tags.aliases).flat();
