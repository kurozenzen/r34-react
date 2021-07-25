import produce from 'immer'
import { PreferenceKey, ResultLayout, SortType, ThemeId } from '../../data/types'
import { AppAction, SET_PREFERENCE, SET_PREFERENCES } from '../actions'

export interface PreferencesState {
  rated: boolean
  ratedThreshold: number
  originals: boolean
  cookies: boolean
  preloadVideos: boolean
  tagSuggestionsCount: number
  resultsLayout: ResultLayout
  pageSize: number
  useCorsProxy: boolean
  showMetadata: boolean
  showComments: boolean
  sort: SortType
  themeId: ThemeId
  autoPlay: boolean
  hideSeen: boolean
}

const initialPreferencesState: PreferencesState = {
  rated: false,
  ratedThreshold: 1,
  originals: false,
  cookies: false,
  preloadVideos: false,
  tagSuggestionsCount: 20,
  resultsLayout: ResultLayout.INFINITE_COLUMN,
  pageSize: 20,
  useCorsProxy: false,
  showMetadata: false,
  showComments: false,
  sort: SortType.DATE,
  themeId: ThemeId.DARK,
  autoPlay: false,
  hideSeen: false,
}

function setPreference<T extends PreferenceKey>(state: PreferencesState, key: T, value: PreferencesState[T]) {
  return produce(state, (draft) => {
    draft[key] = value
  })
}

function setPreferences(state: PreferencesState, preferences: Partial<Record<PreferenceKey, any>>) {
  return produce(state, (draft) => {
    Object.assign(draft, preferences)
  })
}

const preferences = (state: PreferencesState = initialPreferencesState, action: AppAction): PreferencesState => {
  switch (action.type) {
    case SET_PREFERENCE:
      return setPreference(state, action.key, action.value)
    case SET_PREFERENCES:
      return setPreferences(state, action.preferences)
    default:
      return state
  }
}

export default preferences
