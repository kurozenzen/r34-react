import { PreferencesState } from './reducers/preferences'
import { ResultsState } from './reducers/results'
import { TagsState } from './reducers/tags'
import { FullscreenState } from './reducers/fullscreen'
import { LikesState } from './reducers/likes'
import { SuggestionsState } from './reducers/suggestions'
import { ModalsState } from './reducers/modals'

export interface AppState {
  tags: TagsState
  results: ResultsState
  preferences: PreferencesState
  fullscreen: FullscreenState
  likes: LikesState
  modals: ModalsState
  suggestions: SuggestionsState
}
