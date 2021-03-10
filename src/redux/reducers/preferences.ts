import produce from 'immer'
import { PreferenceKey, ResultLayout } from '../../data/types'
import { AppAction, SET_OPTION, ALLOW_COOKIES } from '../actions'

export interface PreferencesState {
  infinite: boolean
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
}

const initialPreferencesState: PreferencesState = {
  infinite: true,
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
}

function setOption<T extends PreferenceKey>(state: PreferencesState, key: T, value: PreferencesState[T]) {
  return produce(state, (draft) => {
    draft[key] = value
  })
}

const preferences = (state: PreferencesState = initialPreferencesState, action: AppAction): PreferencesState => {
  switch (action.type) {
    case SET_OPTION:
      return setOption(state, action.key, action.value)
    case ALLOW_COOKIES:
      return setOption(state, PreferenceKey.COOKIES, action.value)
    default:
      return state
  }
}

export default preferences
