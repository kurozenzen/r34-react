import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import {
  AppAction,
  GET_RESULTS,
  GET_MORE_RESULTS,
  addPosts,
  setPosts,
  ADD_TAG,
  addAliases,
  LIKE_POST,
  FETCH_SUGGESTIONS,
  setSuggestions,
  FETCH_COMMENTS,
  setComments,
} from '../actions'
import { api } from '../../misc/api'
import {
  selectActiveTags,
  selectPageNumber,
  selectHasMoreResults,
  selectMinRating,
  selectPageSize,
  selectSort,
  selectTagSuggestionCount,
  selectPostById,
  selectHideSeen,
} from '../selectors'
import { isSupertag, serializeTagname } from '../../data/tagUtils'

const apiRequests = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  const state = store.getState()
  const hasMoreResults = selectHasMoreResults(state)

  if (action.type === GET_RESULTS) {
    const activeTags = selectActiveTags(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)
    const sort = selectSort(state)
    const hideSeen = selectHideSeen(state)

    const result = await api.getPosts(activeTags, pageSize, action.pageNumber, minRating, sort, hideSeen)

    store.dispatch(setPosts(result.posts, result.count, action.pageNumber))
  }

  if (action.type === GET_MORE_RESULTS && hasMoreResults) {
    const activeTags = selectActiveTags(state)
    const pageNumber = selectPageNumber(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)
    const sort = selectSort(state)
    const hideSeen = selectHideSeen(state)
    console.log('hide seen', hideSeen)

    const res = await api.getPosts(activeTags, pageSize, pageNumber + 1, minRating, sort, hideSeen)

    store.dispatch(addPosts(res.posts))
  }

  if (action.type === ADD_TAG) {
    const activeTags = selectActiveTags(state)
    const aliases = await api.getAliases(action.tag.name)

    const sanitizedAliases = aliases
      .sort((a, b) => b.count - a.count)
      .filter((alias) => !(alias.name in activeTags))
      .map(({ name, count }) => ({ name, count, types: [] }))

    store.dispatch(addAliases(sanitizedAliases, action.tag.name))

    // Request types for newly added tag
    if (!isSupertag(action.tag) && action.tag.types.length === 0) {
      const tags = await api.getTags(action.tag.name, 1)
      const tag = tags.find((tag) => tag.name === action.tag.name)

      if (tag && !isSupertag(tag)) {
        action.tag.types = tag.types
        action.tag.count = tag.count
      }
    }
  }

  if (action.type === LIKE_POST) {
    fetch(`https://rule34.xxx/index.php?page=post&s=vote&id=${action.postId}&type=up`, { mode: 'no-cors' })
      .then(() => {
        // nothing to do, I update the state in advance
      })
      .catch((err) => {
        console.warn('Upvote rejected', err)
      })
  }

  if (action.type === FETCH_SUGGESTIONS) {
    const limit = selectTagSuggestionCount(state)
    const suggestions = await api.getTags(serializeTagname(action.value), limit, action.includeSupertags)

    store.dispatch(setSuggestions(suggestions))
  }

  if (action.type === FETCH_COMMENTS) {
    const post = selectPostById(action.postId)(state)

    if (post) {
      const comments = await api.getComments(post)
      store.dispatch(setComments(action.postId, comments))
    }
  }

  next(action)
}

export default apiRequests
