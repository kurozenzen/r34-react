import { AppAction, SET_POSTS, ADD_POSTS } from '../actions'

import { searchEvent } from '../../analytics/events'
import { selectPageNumber, selectCookies } from '../selectors'
import { MiddlewareAPI, Dispatch } from 'redux'
import { logEvent } from '../../client/firebase'

const eventLogging = (store: MiddlewareAPI<any>) => (next: Dispatch<AppAction>) => (action: AppAction) => {
  const state = store.getState()
  const cookies = selectCookies(state)

  // Only send analytics if the user consented
  if (cookies) {
    if (action.type === ADD_POSTS || action.type === SET_POSTS) {
      const pageNumber = selectPageNumber(state)
      logEvent(searchEvent(pageNumber))
    }
  }

  next(action)
}

export default eventLogging
