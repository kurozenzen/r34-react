import produce from 'immer'
import * as r34 from 'r34-types'
import { AppAction, SET_SUGGESTIONS } from '../actions'

/**
 * Key is postId, Value is time of like
 */
export interface SuggestionsState {
  entries: r34.AnyTag[]
}

const initialReaderState: SuggestionsState = {
  entries: [],
}

const setSuggestions = (state: SuggestionsState, suggestions: r34.AnyTag[]) =>
  produce(state, (draft) => {
    draft.entries = suggestions
  })

const suggestions = (state: SuggestionsState = initialReaderState, action: AppAction): SuggestionsState => {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return setSuggestions(state, action.suggestions)
    default:
      return state
  }
}

export default suggestions
