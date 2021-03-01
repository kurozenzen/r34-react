import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import { AppAction, GET_RESULTS, GET_MORE_RESULTS, addPosts, setPosts } from '../actions'
import api from '../../misc/api'
import { preparePost } from '../../misc/prepare'
import { selectActiveTags, selectPageNumber, selectHasMoreResults, selectMinRating, selectPageSize } from '../selectors'

const apiRequests = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => (action: AppAction) => {
  const state = store.getState()
  if (action.type === GET_RESULTS) {
    const activeTags = selectActiveTags(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)

    api.getPosts(activeTags, pageSize, action.pageNumber, minRating).then((res) => {
      store.dispatch(setPosts(res.posts.map(preparePost), res.count, action.pageNumber))
    })
  }

  const hasMoreResults = selectHasMoreResults(state)
  if (action.type === GET_MORE_RESULTS && hasMoreResults) {
    const activeTags = selectActiveTags(state)
    const pageNumber = selectPageNumber(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)

    api.getPosts(activeTags, pageSize, pageNumber + 1, minRating).then((res) => {
      store.dispatch(addPosts(res.posts.map(preparePost)))
    })
  }

  next(action)
}

export default apiRequests
