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
import api from '../../misc/api'
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
import TagDataClass from '../../data/TagDataClass'
import { serializeTagname } from '../../misc/formatting'
import { parseComment } from '../../data/CommentDataClass'

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
    const suggestions = await api.getTags(serializeTagname(action.value), limit)

    store.dispatch(setSuggestions(suggestions))
  }

  if (action.type === FETCH_COMMENTS) {
    const post = selectPostById(action.postId)(state)

    if (post) {
      const rawComments = (await (await fetch(post.comments_url)).json()) as any[]
      const comments = rawComments.map(parseComment)

      store.dispatch(setComments(action.postId, comments))
    }
  }

  next(action)
}

export default apiRequests
