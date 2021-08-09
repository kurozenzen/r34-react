import * as r34 from 'r34-types'
import { Dispatch } from 'react'
import { MiddlewareAPI } from 'redux'
import { isSuggestionError, isSupertag, serializeTagname } from '../../data/tagUtils'
import { api } from '../../misc/api'
import {
  addAliases,
  addPosts,
  ADD_TAG,
  AppAction,
  FETCH_COMMENTS,
  FETCH_SUGGESTIONS,
  GET_MORE_RESULTS,
  GET_RESULTS,
  LIKE_POST,
  setComments,
  setPosts,
  setSuggestions,
  setSuggestionsError,
} from '../actions'
import {
  selectActiveTags,
  selectHasMoreResults,
  selectHideSeen,
  selectMinRating,
  selectPageNumber,
  selectPageSize,
  selectPostById,
  selectSort,
  selectTagSuggestionCount,
} from '../selectors'

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
      const tags = (await api.getTags(action.tag.name, 1, false)) as r34.Tag[]
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
    const result = await api.getTags(serializeTagname(action.value), limit, action.includeSupertags)

    if (isSuggestionError(result)) {
      store.dispatch(setSuggestionsError(result))
    } else {
      store.dispatch(setSuggestions(result))
    }
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
