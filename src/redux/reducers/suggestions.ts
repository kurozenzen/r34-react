import produce from 'immer'
import * as r34 from 'r34-types'
import { SuggestionsError } from '../../data/types'
import { AppAction, SET_SUGGESTIONS, SET_SUGGESTIONS_ERROR } from '../actions'

export interface SuggestionsState {
  entries: r34.AnyTag[]
  error: SuggestionsError | null
}

const initialSuggestionsState: SuggestionsState = {
  entries: [],
  error: null,
}

const setSuggestions = (state: SuggestionsState, suggestions: r34.AnyTag[]) =>
  produce(state, (draft) => {
    draft.entries = suggestions
    draft.error = null
  })

const setError = (state: SuggestionsState, error: SuggestionsError) =>
  produce(state, (draft) => {
    draft.entries = []
    draft.error = error
  })

const suggestions = (state: SuggestionsState = initialSuggestionsState, action: AppAction): SuggestionsState => {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return setSuggestions(state, action.suggestions)
    case SET_SUGGESTIONS_ERROR:
      return setError(state, action.error)
    default:
      return state
  }
}

export default suggestions
