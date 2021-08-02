import { ModalIds, PreferenceKey, TagLike } from '../data/types'
import TagDataClass from '../data/TagDataClass'
import PostDataClass from '../data/PostDataClass'
import CommentDataClass from '../data/CommentDataClass'

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

// Action Types
interface AddTagAction {
  type: typeof ADD_TAG
  tag: TagDataClass
}

interface RemoveTagAction {
  type: typeof REMOVE_TAG
  tag: TagDataClass
}

interface AddAliasesAction {
  type: typeof ADD_ALIASES
  aliases: TagDataClass[]
  forTag: string
}

export interface AddPostsAction {
  type: typeof ADD_POSTS
  posts: PostDataClass[]
}

export interface SetPostsAction {
  type: typeof SET_POSTS
  posts: PostDataClass[]
  count: number
  pageNumber?: number
}

interface SetCommentsAction {
  type: typeof SET_COMMENTS
  postId: number
  comments: CommentDataClass[]
}

interface FetchCommentsAction {
  type: typeof FETCH_COMMENTS
  postId: number
}

interface SetPreferenceAction {
  type: typeof SET_PREFERENCE
  key: PreferenceKey
  value: any
}

interface SetPreferencesAction {
  type: typeof SET_PREFERENCES
  preferences: Partial<Record<PreferenceKey, any>>
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
  postId: number
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
  modalId: ModalIds
}

interface CloseModalAction {
  type: typeof CLOSE_MODAL
}

interface SetSuggestionsAction {
  type: typeof SET_SUGGESTIONS
  suggestions: TagLike[]
}

interface FetchSuggestionsAction {
  type: typeof FETCH_SUGGESTIONS
  value: string
}

interface FetchPreferencesAction {
  type: typeof FETCH_PREFERENCES
}

interface SavePreferencesAction {
  type: typeof SAVE_PREFERENCES
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

// Action Creators
export function addTag(tag: TagDataClass): AddTagAction {
  return {
    type: ADD_TAG,
    tag,
  }
}

export function removeTag(tag: TagDataClass): RemoveTagAction {
  return {
    type: REMOVE_TAG,
    tag,
  }
}

export function addAliases(aliases: TagDataClass[], forTag: string): AddAliasesAction {
  return {
    type: ADD_ALIASES,
    aliases,
    forTag,
  }
}

export function addPosts(posts: PostDataClass[]): AddPostsAction {
  return {
    type: ADD_POSTS,
    posts,
  }
}

export function setPosts(posts: PostDataClass[], count: number, pageNumber: number = 0): SetPostsAction {
  return {
    type: SET_POSTS,
    posts,
    count,
    pageNumber,
  }
}

export function setComments(postId: number, comments: CommentDataClass[]): SetCommentsAction {
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

export function setPreferences(preferences: Partial<Record<PreferenceKey, any>>): SetPreferencesAction {
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

export function setFullScreenPost(postId: number): SetFullScreenPostAction {
  return {
    type: SET_FULLSCREEN_POST,
    postId,
  }
}

export function likePost(postId: number): LikePostAction {
  return {
    type: LIKE_POST,
    postId,
  }
}

export function openModal(modalId: ModalIds): OpenModalAction {
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

export function setSuggestions(suggestions: TagLike[]): SetSuggestionsAction {
  return {
    type: SET_SUGGESTIONS,
    suggestions,
  }
}

export function fetchSuggestions(value: string): FetchSuggestionsAction {
  return {
    type: FETCH_SUGGESTIONS,
    value,
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
