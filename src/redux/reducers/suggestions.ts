import produce from 'immer'
import * as r34 from 'r34-types'
import { SuggestionsError } from '../../data/types'
import { AppAction, SET_SUGGESTIONS, SET_SUGGESTIONS_ERROR, SET_SUGGESTIONS_MODIFIER } from '../actions'

export interface SuggestionsState {
  entries: r34.AnyTag[]
  error: SuggestionsError | null
  modifier: r34.TagModifier
}

const initialSuggestionsState: SuggestionsState = {
  entries: [],
  error: null,
  modifier: '+',
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

const setModifier = (state: SuggestionsState, modifier: r34.TagModifier) =>
  produce(state, (draft) => {
    draft.modifier = modifier
  })

const suggestions = (state: SuggestionsState = initialSuggestionsState, action: AppAction): SuggestionsState => {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return setSuggestions(state, action.suggestions)
    case SET_SUGGESTIONS_ERROR:
      return setError(state, action.error)
    case SET_SUGGESTIONS_MODIFIER:
      return setModifier(state, action.modifier)
    default:
      return state
  }
}

export default suggestions
