import { AliasTag } from 'r34-types'
import { R34Client } from '../../client/R34Client'
import { Dispatch } from 'react'
import { MiddlewareAPI } from 'redux'
import { isSuggestionError, isSupertag, serializeTagname } from '../../data/tagUtils'
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
  SET_PREFERENCE,
} from '../actions'
import {
  selectActiveTags,
  selectHasMoreResults,
  selectMinRating,
  selectPageNumber,
  selectPageSize,
  selectPostById,
  selectSort,
  selectTagSuggestionCount,
} from '../selectors'

const client = new R34Client(['https://r34-json.herokuapp.com', 'https://r34-api-clone.herokuapp.com'], {
  version: 'v2',
  useFirebase: true,
  requestRetries: 1,
  verbose: true,
})

const apiRequests = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  const state = store.getState()
  const hasMoreResults = selectHasMoreResults(state)

  if (action.type === SET_PREFERENCE && action.key === 'backends') {
    client.backends = action.value as string[]
  }

  if ((action as any).type === 'persist/REHYDRATE') {
    if ((action as any)?.payload?.preferences?.backends) {
      client.backends = (action as any).payload.preferences.backends
    }
  }

  if (action.type === GET_RESULTS) {
    const activeTags = selectActiveTags(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)
    const sort = selectSort(state)

    const result = await client.getPosts({
      tags: activeTags,
      limit: pageSize,
      page: action.pageNumber,
      score: `>=${minRating}`,
      sort,
    })

    store.dispatch(setPosts(result.posts, result.count, action.pageNumber))
  }

  if (action.type === GET_MORE_RESULTS && hasMoreResults) {
    const activeTags = selectActiveTags(state)
    const pageNumber = selectPageNumber(state)
    const pageSize = selectPageSize(state)
    const minRating = selectMinRating(state)
    const sort = selectSort(state)

    const result = await client.getPosts({
      tags: activeTags,
      limit: pageSize,
      page: pageNumber + 1,
      score: `>=${minRating}`,
      sort,
    })

    store.dispatch(addPosts(result.posts))
  }

  if (action.type === ADD_TAG) {
    const activeTags = selectActiveTags(state)
    let aliases: AliasTag[] = []
    try {
      aliases = await client.getAliases({ name: action.tag.name })
    } catch (err) {
      console.warn('Failed toget aliases for tag:', action.tag)
    }

    const sanitizedAliases = aliases
      .sort((a, b) => b.count - a.count)
      .filter((alias) => !(alias.name in activeTags))
      .map(({ name, count }) => ({ name, count, types: [] }))

    store.dispatch(addAliases(sanitizedAliases, action.tag.name))

    // Request types for newly added tag
    if (!isSupertag(action.tag) && action.tag.types.length === 0) {
      try {
        const data = await client.getTags({
          name: action.tag.name,
          limit: 1,
        })
        if (!isSuggestionError(data)) {
          const tag = data.find((tag) => tag.name === action.tag.name)

          if (tag && !isSupertag(tag)) {
            action.tag.types = tag.types
            action.tag.count = tag.count
          }
        }
      } catch (err) {
        console.warn('Failed to get types for tag:', action.tag)
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
    const result = await client.getTags({
      name: serializeTagname(action.value.length > 3 ? `*${action.value}*` : action.value),
      limit,
      supertags: action.includeSupertags,
      sort: "count"
    })

    if (isSuggestionError(result)) {
      store.dispatch(setSuggestionsError(result))
    } else {
      store.dispatch(setSuggestions(result))
    }
  }

  if (action.type === FETCH_COMMENTS) {
    const post = selectPostById(action.postId)(state)

    if (post) {
      const comments = await client.getComments({ commentsUrl: post.comments_url })
      store.dispatch(setComments(action.postId, comments))
    }
  }

  next(action)
}

export default apiRequests
