import { PreferenceKey, TagType } from '../data/types'
import TagDataClass from '../data/Tag'
import PostDataClass from '../data/Post'

// Action Names
export const ADD_TAG = 'R34_ADD_TAG'
export const REMOVE_TAG = 'R34_REMOVE_TAG'
export const ADD_ALIASES = 'R34_ADD_ALIASES'
export const ADD_TYPES = 'R34_ADD_TYPES'
export const ADD_POSTS = 'R34_ADD_POSTS'
export const SET_POSTS = 'R34_SET_POSTS'
export const SET_OPTION = 'R34_SET_OPTION'
export const GET_RESULTS = 'R34_GET_RESULTS'
export const GET_MORE_RESULTS = 'R34_GET_MORE_RESULTS'
export const ALLOW_COOKIES = 'R34_ALLOW_COOKIES'
export const ENTER_FULLSCREEN = 'R34_ENTER_FULLSCREEN'
export const EXIT_FULLSCREEN = 'R34_EXIT_FULLSCREEN'
export const SET_FULLSCREEN_POST = 'R34_SET_FULLSCREEN_POST'

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

interface AddTypesAction {
  type: typeof ADD_TYPES
  types: TagType[]
  forTag: string
}

interface AddPostsAction {
  type: typeof ADD_POSTS
  posts: PostDataClass[]
}

interface SetPostsAction {
  type: typeof SET_POSTS
  posts: PostDataClass[]
  count: number
  pageNumber?: number
}

interface SetOptionAction {
  type: typeof SET_OPTION
  key: PreferenceKey
  value: any
}

interface GetResultsAction {
  type: typeof GET_RESULTS
  pageNumber: number
}

interface GetMoreResultsAction {
  type: typeof GET_MORE_RESULTS
}

interface AllowCookiesAction {
  type: typeof ALLOW_COOKIES
  value: boolean
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

export type AppAction =
  | AddTagAction
  | RemoveTagAction
  | AddAliasesAction
  | AddTypesAction
  | AddPostsAction
  | SetPostsAction
  | SetOptionAction
  | GetResultsAction
  | GetMoreResultsAction
  | AllowCookiesAction
  | EnterFullcreenAction
  | ExitFullscreenAction
  | SetFullScreenPostAction

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

export function addTypes(types: TagType[], forTag: string): AddTypesAction {
  return {
    type: ADD_TYPES,
    types,
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

export function setOption(key: PreferenceKey, value: any): SetOptionAction {
  return {
    type: SET_OPTION,
    key,
    value,
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

export function allowCookiesAction(): AllowCookiesAction {
  return {
    type: ALLOW_COOKIES,
    value: true,
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
