import produce from "immer";
import { PreferenceKey } from "../../data/types";
import { AppAction, SET_OPTION } from "../actions";

export interface PreferencesState {
  infinite: boolean;
  rated: boolean;
  ratedTreshold: number;
  originals: boolean;
}

export const initialPreferencesState: PreferencesState = {
  infinite: true,
  rated: false,
  ratedTreshold: 1,
  originals: false,
};

const setOption = (state: PreferencesState, key: PreferenceKey, value: any) =>
  produce(state, (draft) => {
    switch (key) {
      case "infinite":
        draft.infinite = value;
        break;
      case "rated":
        draft.rated = value;
        break;
      case "ratedTreshold":
        draft.ratedTreshold = value;
        break;
      case "originals":
        draft.originals = value;
    }
  });

export default (
  state: PreferencesState = initialPreferencesState,
  action: AppAction
): PreferencesState => {
  switch (action.type) {
    case SET_OPTION:
      return setOption(state, action.key, action.value);
    default:
      return state;
  }
};
