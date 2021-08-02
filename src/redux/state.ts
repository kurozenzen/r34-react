import { PreferencesState } from './reducers/preferences'
import { ResultsState } from './reducers/results'
import { TagsState } from './reducers/tags'
import { ReaderState } from './reducers/reader'
import { LikesState } from './reducers/likes'
import { SuggestionsState } from './reducers/suggestions'
import { ModalsState } from './reducers/modals'

export default interface State {
  tags: TagsState
  results: ResultsState
  preferences: PreferencesState
  reader: ReaderState
  likes: LikesState
  modals: ModalsState
  suggestions: SuggestionsState
}
