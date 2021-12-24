import { ModalId, SuggestionsError } from '../data/types'
import { AliasTag, AnyBiasedTag, AnyTag, Comment, Post, PreferenceKey, TagModifier } from 'r34-types'
import { PreferencesState } from './reducers/preferences'

// Action Names
export const ADD_ALIASES = `r34-react/ADD_ALIASES`
export const ADD_POSTS = `r34-react/ADD_POSTS`
export const ADD_TAG = `r34-react/ADD_TAG`
export const CLOSE_MODAL = `r34-react/CLOSE_MODAL`
export const ENTER_FULLSCREEN = `r34-react/ENTER_FULLSCREEN`
export const EXIT_FULLSCREEN = 'r34-react/EXIT_FULLSCREEN'
export const FETCH_COMMENTS = `r34-react/FETCH_COMMENTS`
export const FETCH_PREFERENCES = `r34-react/FETCH_PREFERENCES`
export const FETCH_SUGGESTIONS = `r34-react/FETCH_SUGGESTIONS`
export const GET_MORE_RESULTS = `r34-react/GET_MORE_RESULTS`
export const GET_RESULTS = `r34-react/GET_RESULTS`
export const LIKE_POST = `r34-react/LIKE_POST`
export const OPEN_MODAL = `r34-react/OPEN_MODAL`
export const REMOVE_TAG = `r34-react/REMOVE_TAG`
export const SAVE_PREFERENCES = 'r34-react/SAVE_PREFERENCES'
export const SET_COMMENTS = `r34-react/SET_COMMENTS`
export const SET_FULLSCREEN_POST = `r34-react/SET_FULLSCREEN_POST`
export const SET_POSTS = `r34-react/SET_POSTS`
export const SET_PREFERENCE = `r34-react/SET_PREFERENCE`
export const SET_PREFERENCES = `r34-react/SET_PREFERENCES`
export const SET_SUGGESTIONS = `r34-react/SET_SUGGESTIONS`
export const SET_SUGGESTIONS_ERROR = `r34-react/SET_SUGGESTIONS_ERROR`
export const SET_SUGGESTIONS_MODIFIER = 'r34-react/SET_SUGGESTIONS_MODIFIER'
export const SCROLL_TO_POST = 'r34-react/SCROLL_TO_POST'

// Action Types
interface AddTagAction {
  type: typeof ADD_TAG
  tag: AnyBiasedTag
}

interface RemoveTagAction {
  type: typeof REMOVE_TAG
  tagName: string
}

interface AddAliasesAction {
  type: typeof ADD_ALIASES
  aliases: AliasTag[]
  forTag: string
}

export interface AddPostsAction {
  type: typeof ADD_POSTS
  posts: Post[]
}

export interface SetPostsAction {
  type: typeof SET_POSTS
  posts: Post[]
  count: number
  pageNumber?: number
}

interface SetCommentsAction {
  type: typeof SET_COMMENTS
  postId: number
  comments: Comment[]
}

interface FetchCommentsAction {
  type: typeof FETCH_COMMENTS
  postId: number
}

interface SetPreferenceAction {
  type: typeof SET_PREFERENCE
  key: PreferenceKey
  value: PreferencesState[PreferenceKey]
}

interface SetPreferencesAction {
  type: typeof SET_PREFERENCES
  preferences: Partial<PreferencesState>
}

interface GetResultsAction {
  type: typeof GET_RESULTS
  pageNumber: number
}

interface GetMoreResultsAction {
  type: typeof GET_MORE_RESULTS
}

interface EnterFullcreenAction {
  type: typeof ENTER_FULLSCREEN
  postId: number
}

interface SetFullScreenPostAction {
  type: typeof SET_FULLSCREEN_POST
  index: number
}

interface ExitFullscreenAction {
  type: typeof EXIT_FULLSCREEN
}

interface LikePostAction {
  type: typeof LIKE_POST
  postId: number
}

interface OpenModalAction {
  type: typeof OPEN_MODAL
  modalId: ModalId
}

interface CloseModalAction {
  type: typeof CLOSE_MODAL
}

interface SetSuggestionsAction {
  type: typeof SET_SUGGESTIONS
  suggestions: AnyTag[]
}

interface SetSuggestionsErrorAction {
  type: typeof SET_SUGGESTIONS_ERROR
  error: SuggestionsError
}

interface FetchSuggestionsAction {
  type: typeof FETCH_SUGGESTIONS
  value: string
  includeSupertags: boolean
}

interface FetchPreferencesAction {
  type: typeof FETCH_PREFERENCES
}

interface SavePreferencesAction {
  type: typeof SAVE_PREFERENCES
}

interface SetSuggestionsModifierAction {
  type: typeof SET_SUGGESTIONS_MODIFIER
  modifier: TagModifier
}

interface ScrollToPostAction {
  type: typeof SCROLL_TO_POST
  index: number
}

export type AppAction =
  | AddAliasesAction
  | AddPostsAction
  | AddTagAction
  | CloseModalAction
  | EnterFullcreenAction
  | ExitFullscreenAction
  | FetchCommentsAction
  | FetchPreferencesAction
  | FetchSuggestionsAction
  | GetMoreResultsAction
  | GetResultsAction
  | LikePostAction
  | OpenModalAction
  | RemoveTagAction
  | SavePreferencesAction
  | SetCommentsAction
  | SetFullScreenPostAction
  | SetPostsAction
  | SetPreferenceAction
  | SetPreferencesAction
  | SetSuggestionsAction
  | SetSuggestionsErrorAction
  | SetSuggestionsModifierAction
  | ScrollToPostAction

// Action Creators
export function addTag(tag: AnyBiasedTag): AddTagAction {
  return {
    type: ADD_TAG,
    tag,
  }
}

export function removeTag(tagName: string): RemoveTagAction {
  return {
    type: REMOVE_TAG,
    tagName,
  }
}

export function addAliases(aliases: AliasTag[], forTag: string): AddAliasesAction {
  return {
    type: ADD_ALIASES,
    aliases,
    forTag,
  }
}

export function addPosts(posts: Post[]): AddPostsAction {
  return {
    type: ADD_POSTS,
    posts,
  }
}

export function setPosts(posts: Post[], count: number, pageNumber: number = 0): SetPostsAction {
  return {
    type: SET_POSTS,
    posts,
    count,
    pageNumber,
  }
}

export function setComments(postId: number, comments: Comment[]): SetCommentsAction {
  return {
    type: SET_COMMENTS,
    postId,
    comments,
  }
}

export function fetchComments(postId: number): FetchCommentsAction {
  return {
    type: FETCH_COMMENTS,
    postId,
  }
}

export function setPreference(key: PreferenceKey, value: any): SetPreferenceAction {
  return {
    type: SET_PREFERENCE,
    key,
    value,
  }
}

export function setPreferences(preferences: Partial<PreferencesState>): SetPreferencesAction {
  return {
    type: SET_PREFERENCES,
    preferences,
  }
}

export function getResults(pageNumber: number = 0): GetResultsAction {
  return {
    type: GET_RESULTS,
    pageNumber,
  }
}

export function getMoreResults(): GetMoreResultsAction {
  return {
    type: GET_MORE_RESULTS,
  }
}

export function enterFullscreen(postId: number): EnterFullcreenAction {
  return {
    type: ENTER_FULLSCREEN,
    postId,
  }
}

export function exitFullscreen(): ExitFullscreenAction {
  return {
    type: EXIT_FULLSCREEN,
  }
}

export function setFullscreenPost(index: number): SetFullScreenPostAction {
  return {
    type: SET_FULLSCREEN_POST,
    index,
  }
}

export function scrollToPost(index: number): ScrollToPostAction {
  return {
    type: SCROLL_TO_POST,
    index,
  }
}

export function likePost(postId: number): LikePostAction {
  return {
    type: LIKE_POST,
    postId,
  }
}

export function openModal(modalId: ModalId): OpenModalAction {
  return {
    type: OPEN_MODAL,
    modalId,
  }
}

export function closeModal(): CloseModalAction {
  return {
    type: CLOSE_MODAL,
  }
}

export function setSuggestions(suggestions: AnyTag[]): SetSuggestionsAction {
  return {
    type: SET_SUGGESTIONS,
    suggestions,
  }
}

export function setSuggestionsError(error: SuggestionsError): SetSuggestionsErrorAction {
  return {
    type: SET_SUGGESTIONS_ERROR,
    error,
  }
}

export function fetchSuggestions(value: string, includeSupertags: boolean): FetchSuggestionsAction {
  return {
    type: FETCH_SUGGESTIONS,
    value,
    includeSupertags,
  }
}

export function fetchPreferences(): FetchPreferencesAction {
  return {
    type: FETCH_PREFERENCES,
  }
}

export function savePreferences(): SavePreferencesAction {
  return {
    type: SAVE_PREFERENCES,
  }
}

export function setSuggestionsModifier(modifier: TagModifier): SetSuggestionsModifierAction {
  return {
    type: SET_SUGGESTIONS_MODIFIER,
    modifier,
  }
}
