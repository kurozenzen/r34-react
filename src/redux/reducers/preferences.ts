import produce from 'immer'
import * as r34 from 'r34-types'
import { AppAction, SET_PREFERENCE, SET_PREFERENCES } from '../actions'

export interface PreferencesState {
  rated: boolean
  ratedThreshold: number
  originals: boolean
  cookies: boolean
  preloadVideos: boolean
  tagSuggestionsCount: number
  resultsLayout: r34.ResultsLayout
  pageSize: number
  showMetadata: boolean
  showComments: boolean
  sort: r34.PostsSort
  themeId: r34.Theme
  autoPlay: boolean
  hideSeen: boolean
  autoscrollDelay: number
  showPostDetails: boolean
  backends: string[]
}

export const initialPreferencesState: PreferencesState = {
  rated: false,
  ratedThreshold: 1,
  originals: false,
  cookies: false,
  preloadVideos: false,
  tagSuggestionsCount: 20,
  resultsLayout: 'infinite_column',
  pageSize: 20,
  showMetadata: false,
  showComments: false,
  sort: 'date:desc',
  themeId: 'dark',
  autoPlay: false,
  hideSeen: false,
  autoscrollDelay: 10,
  showPostDetails: true,
  backends: ['https://r34-json.herokuapp.com', 'https://r34-api-clone.herokuapp.com'],
}

function setPreference<T extends r34.PreferenceKey>(state: PreferencesState, key: T, value: PreferencesState[T]) {
  return produce(state, (draft) => {
    draft[key] = value
  })
}

function setPreferences(state: PreferencesState, preferences: Partial<PreferencesState>) {
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
