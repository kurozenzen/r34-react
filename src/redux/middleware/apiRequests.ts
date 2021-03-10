import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import { AppAction, GET_RESULTS, GET_MORE_RESULTS, addPosts, setPosts, ADD_TAG, addAliases } from '../actions'
import api from '../../misc/api'
import {
  selectActiveTags,
  selectPageNumber,
  selectHasMoreResults,
  selectMinRating,
  selectPageSize,
  selectSort,
} from '../selectors'
import TagDataClass from '../../data/TagDataClass'

const apiRequests = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  const state = store.getState()
  const hasMoreResults = selectHasMoreResults(state)

  if (action.type === GET_RESULTS) {
    const activeTags = selectActiveTags(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)
    const sort = selectSort(state)

    const result = await api.getPosts(activeTags, pageSize, action.pageNumber, minRating, sort)

    store.dispatch(setPosts(result.posts, result.count, action.pageNumber))
  }

  if (action.type === GET_MORE_RESULTS && hasMoreResults) {
    const activeTags = selectActiveTags(state)
    const pageNumber = selectPageNumber(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)
    const sort = selectSort(state)

    const res = await api.getPosts(activeTags, pageSize, pageNumber + 1, minRating, sort)

    store.dispatch(addPosts(res.posts))
  }

  if (action.type === ADD_TAG) {
    const activeTags = selectActiveTags(state)
    const aliases = await api.getAliases(action.tag.name)

    const sanitizedAliases = aliases
      .sort((a, b) => b.posts - a.posts)
      .filter((alias) => !(alias.name in activeTags))
      .map((alias) => new TagDataClass(alias.name, [], alias.posts))

    store.dispatch(addAliases(sanitizedAliases, action.tag.name))

    // Request types for newly added tag
    if (action.tag.types?.length === 0) {
      const tags = await api.getTags(action.tag.name)
      const tag = tags.find((tag) => (tag.name = action.tag.name))

      if (tag) {
        action.tag.types = tag.types
        action.tag.count = tag.posts
      }
    }
  }

  next(action)
}

export default apiRequests
