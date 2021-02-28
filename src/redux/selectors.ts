import { createSelector } from 'reselect'
import PostDataClass from '../data/Post'
import { PreferencesState } from './reducers/preferences'
import { ReaderState } from './reducers/reader'
import { ResultsState } from './reducers/results'
import { TagsState } from './reducers/tags'

interface RootState {
  results: ResultsState
  preferences: PreferencesState
  tags: TagsState
  reader: ReaderState
}

// Simple selectors
export const selectActiveTags = (state: RootState) => state.tags.active
export const selectResults = (state: RootState) => state.results
export const selectPosts = (state: RootState) => state.results.posts
export const selectCount = (state: RootState) => state.results.count
export const selectPageNumber = (state: RootState) => state.results.pageNumber
export const selectPreferences = (state: RootState) => state.preferences
export const selectResultsLayout = (state: RootState) => state.preferences.resultsLayout
export const selectPreloadVideos = (state: RootState) => state.preferences.resultsLayout
export const selectInfinite = (state: RootState) => state.preferences.infinite
export const selectOriginals = (state: RootState) => state.preferences.originals
export const selectRated = (state: RootState) => state.preferences.rated
export const selectRatedThreshold = (state: RootState) => state.preferences.ratedTreshold
export const selectCookies = (state: RootState) => state.preferences.cookies
export const selectFullsceenState = (state: RootState) => state.reader.isEnabled
export const selectFullsceenPostId = (state: RootState) => state.reader.postId
export const selectAliases = (state: RootState) => state.tags.aliases
export const selectPageSize = (state: RootState) => state.preferences.pageSize
export const selectTagSuggestionCount = (state: RootState) => state.preferences.tagSuggestionsCount

// Memoized selectors
export const selectNumberOfActiveTags = createSelector(selectActiveTags, (tags) => Object.keys(tags).length)
export const selectAliasesAsList = createSelector(selectAliases, (aliases) => Object.values(aliases).flat())

export const selectHasResults = createSelector(selectPosts, (posts) => posts.length !== 0)
export const selectOutOfResults = createSelector(selectPosts, selectCount, (posts, count) => posts.length === count)
export const selectHasMoreResults = createSelector(selectOutOfResults, (outOfResults) => !outOfResults)
export const selectLastPage = createSelector(
  selectCount,
  selectPageSize,
  (count, pageSize) => Math.ceil(count / pageSize) - 1
)
export const selectFullScreenPost = createSelector(
  selectPosts,
  selectFullsceenPostId,
  (posts, fullScreenPostId) => posts.find((post) => post.id === fullScreenPostId) as PostDataClass
)
export const selectFullScreenIndex = createSelector(selectPosts, selectFullScreenPost, (posts, fullScreenPost) =>
  posts.indexOf(fullScreenPost)
)

// Parameterized selectors
export const selectAliasesByTagName = (tagName: string) => (state: RootState) => state.tags.aliases[tagName]
