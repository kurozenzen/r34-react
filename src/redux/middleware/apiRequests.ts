import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import { AppAction, GET_RESULTS, GET_MORE_RESULTS, addPosts, setPosts } from '../actions'
import api from '../../misc/api'
import { preparePost } from '../../misc/prepare'
import { selectActiveTags, selectPreferences, selectPageNumber, selectOutOfResults } from '../selectors'

const apiRequests = (store: MiddlewareAPI<any>) => (next: Dispatch<AppAction>) => (action: AppAction) => {
  if (action.type === GET_RESULTS) {
    const activeTags = selectActiveTags(store.getState())
    const { pageSize } = selectPreferences(store.getState())
    const { rated, ratedTreshold } = selectPreferences(store.getState())

    api.getPosts(activeTags, pageSize, action.pageNumber, rated ? ratedTreshold : 0).then((res) => {
      store.dispatch(setPosts(res.posts.map(preparePost), res.count, action.pageNumber))
    })
  }

  const isOutOfResults = selectOutOfResults(store.getState())
  if (action.type === GET_MORE_RESULTS && !isOutOfResults) {
    const activeTags = selectActiveTags(store.getState())
    const { pageSize } = selectPreferences(store.getState())
    const pageNumber = selectPageNumber(store.getState())
    const { rated, ratedTreshold } = selectPreferences(store.getState())

    api.getPosts(activeTags, pageSize, pageNumber + 1, rated ? ratedTreshold : 0).then((res) => {
      store.dispatch(addPosts(res.posts.map(preparePost)))
    })
  }

  next(action)
}

export default apiRequests
