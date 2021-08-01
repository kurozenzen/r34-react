import { AppAction, SET_POSTS, ADD_POSTS } from '../actions'

import { searchEvent } from '../../analytics/events'
import { selectActiveTags, selectPreferences, selectPageNumber, selectCookies } from '../selectors'
import { MiddlewareAPI, Dispatch } from 'redux'
import { logEvent } from '../../firebase'

const eventLogging = (store: MiddlewareAPI<any>) => (next: Dispatch<AppAction>) => (action: AppAction) => {
  const state = store.getState()
  const cookies = selectCookies(state)

  // Only send analytics if the user consented
  if (cookies) {
    if (action.type === ADD_POSTS || action.type === SET_POSTS) {
      const activeTags = selectActiveTags(state)
      const pageNumber = selectPageNumber(state)
      const preferences = selectPreferences(state)
      logEvent(searchEvent(activeTags, pageNumber, preferences))
    }
  }

  next(action)
}

export default eventLogging
