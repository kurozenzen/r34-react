import { createSelector, defaultMemoize } from 'reselect'
import { DefaultRootState } from '../react-redux'

// Simple selectors
export const selectActiveTags = (state: DefaultRootState) => state.tags.active
export const selectResults = (state: DefaultRootState) => state.results
export const selectPosts = (state: DefaultRootState) => state.results.posts
export const selectCount = (state: DefaultRootState) => state.results.count
export const selectPageNumber = (state: DefaultRootState) => state.results.pageNumber
export const selectPreferences = (state: DefaultRootState) => state.preferences
export const selectResultsLayout = (state: DefaultRootState) => state.preferences.resultsLayout
export const selectPreloadVideos = (state: DefaultRootState) => state.preferences.resultsLayout
export const selectOriginals = (state: DefaultRootState) => state.preferences.originals
export const selectRated = (state: DefaultRootState) => state.preferences.rated
export const selectRatedThreshold = (state: DefaultRootState) => state.preferences.ratedThreshold
export const selectCookies = (state: DefaultRootState) => state.preferences.cookies
export const selectFullsceenState = (state: DefaultRootState) => state.reader.isEnabled
export const selectFullsceenPostId = (state: DefaultRootState) => state.reader.postId
export const selectAliases = (state: DefaultRootState) => state.tags.aliases
export const selectPageSize = (state: DefaultRootState) => state.preferences.pageSize
export const selectTagSuggestionCount = (state: DefaultRootState) => state.preferences.tagSuggestionsCount
export const selectUseCorsProxy = (state: DefaultRootState) => state.preferences.useCorsProxy
export const selectShowMetadata = (state: DefaultRootState) => state.preferences.showMetadata
export const selectShowComments = (state: DefaultRootState) => state.preferences.showComments
export const selectSort = (state: DefaultRootState) => state.preferences.sort
export const selectSuggestions = (state: DefaultRootState) => state.suggestions.entries
export const selectActiveThemeId = (state: DefaultRootState) => state.preferences.themeId
export const selectAutoPlay = (state: DefaultRootState) => state.preferences.autoPlay
export const selectHideSeen = (state: DefaultRootState) => state.preferences.hideSeen

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
export const selectFullScreenPost = createSelector(selectPosts, selectFullsceenPostId, (posts, fullScreenPostId) =>
  posts.find((post) => post.id === fullScreenPostId)
)
export const selectFullScreenIndex = createSelector(selectPosts, selectFullScreenPost, (posts, fullScreenPost) =>
  fullScreenPost ? posts.indexOf(fullScreenPost) : -1
)
export const selectMinRating = createSelector(selectRated, selectRatedThreshold, (rated, ratedThreshold) =>
  rated ? ratedThreshold : 0
)
export const selectNextIndex = createSelector(selectPosts, selectFullScreenIndex, (posts, selectedIndex) =>
  selectedIndex + 1 < posts.length ? selectedIndex + 1 : undefined
)
export const selectPreviousIndex = createSelector(selectFullScreenIndex, (selectedIndex) =>
  selectedIndex > 0 ? selectedIndex - 1 : undefined
)

// Parameterized selectors
export const selectPostById = defaultMemoize((id: number) => {
  return createSelector(selectPosts, (posts) => {
    return posts.find((post) => post.id === id)
  })
})

export const selectAliasesByTagName = defaultMemoize((tagName: string) => {
  return createSelector(selectAliases, (aliases) => {
    return aliases[tagName]
  })
})

export const selectLikedByPostId = defaultMemoize((id: number) => (state: DefaultRootState) => id in state.likes)
