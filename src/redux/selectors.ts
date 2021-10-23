import * as r34 from 'r34-types'
import { createSelector, defaultMemoize } from 'reselect'
import { isSupertag } from '../data/tagUtils'
import { ModalId } from '../data/types'
import { AppState } from './appState'

// Simple selectors
export const selectActiveTags = (state: AppState) => state.tags.active
export const selectActiveThemeId = (state: AppState) => state.preferences.themeId
export const selectAliases = (state: AppState) => state.tags.aliases
export const selectAutoPlay = (state: AppState) => state.preferences.autoPlay
export const selectCookies = (state: AppState) => state.preferences.cookies
export const selectCount = (state: AppState) => state.results.count
export const selectFullsceenIndex = (state: AppState) => state.fullscreen.currentIndex
export const selectFullsceenState = (state: AppState) => state.fullscreen.isEnabled
export const selectHideSeen = (state: AppState) => state.preferences.hideSeen
export const selectOpenModalId = (state: AppState) => state.modals.openModal
export const selectOriginals = (state: AppState) => state.preferences.originals
export const selectPageNumber = (state: AppState) => state.results.pageNumber
export const selectPageSize = (state: AppState) => state.preferences.pageSize
export const selectPosts = (state: AppState) => state.results.posts
export const selectPreferences = (state: AppState) => state.preferences
export const selectPreloadVideos = (state: AppState) => state.preferences.preloadVideos
export const selectPreloadGifs = (state: AppState) => state.preferences.preloadVideos
export const selectRated = (state: AppState) => state.preferences.rated
export const selectRatedThreshold = (state: AppState) => state.preferences.ratedThreshold
export const selectResults = (state: AppState) => state.results
export const selectResultsLayout = (state: AppState) => state.preferences.resultsLayout
export const selectShowComments = (state: AppState) => state.preferences.showComments
export const selectShowMetadata = (state: AppState) => state.preferences.showMetadata
export const selectSort = (state: AppState) => state.preferences.sort
export const selectSuggestions = (state: AppState) => state.suggestions.entries
export const selectSuggestionsError = (state: AppState) => state.suggestions.error
export const selectSuggestionsModifier = (state: AppState) => state.suggestions.modifier
export const selectTagSuggestionCount = (state: AppState) => state.preferences.tagSuggestionsCount
export const selectUpdated = (state: AppState) => state.results.updated
export const selectAutoscrollDelay = (state: AppState) => state.preferences.autoscrollDelay
export const selectScrollIndex = (state: AppState) => state.fullscreen.scrollIndex
export const selectShowPostDetails = (state: AppState) => state.preferences.showPostDetails

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
  selectFullsceenIndex,
  (posts, fullScreenIndex) => posts[fullScreenIndex]
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
export const selectSupertagModalOpen = createSelector(
  selectOpenModalId,
  (modalId) => modalId === ModalId.CREATE_SUPERTAG
)
export const selectCellularWarningModalOpen = createSelector(
  selectOpenModalId,
  (modalId) => modalId === ModalId.CELLULAR_WARNING
)

// Parameterized selectors
export const selectPostById = defaultMemoize((id: number) => {
  return createSelector(selectPosts, (posts) => {
    return posts.find((post) => post.id === id) as r34.Post
  })
})
export const selectPostByIndex = defaultMemoize((index: number) => {
  return createSelector(selectPosts, (posts) => {
    return posts[index]
  })
})

export const selectAliasesByTagName = defaultMemoize((tagName: string) => {
  return createSelector(selectAliases, (aliases) => {
    return aliases[tagName]
  })
})

export const selectLikedByPostId = defaultMemoize((id: number) => (state: AppState) => id in state.likes)

export const selectActiveSupertagTags = createSelector(selectActiveTags, (activeTags) =>
  Object.values(activeTags)
    .filter(isSupertag)
    .reduce((result, tag) => ({ ...result, ...tag.tags }), {})
)
