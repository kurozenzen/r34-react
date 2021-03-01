import { PreferencesState } from './reducers/preferences'
import { ResultsState } from './reducers/results'
import { TagsState } from './reducers/tags'
import { ReaderState } from './reducers/reader'

export default interface State {
  tags: TagsState
  results: ResultsState
  preferences: PreferencesState
  reader: ReaderState
}
