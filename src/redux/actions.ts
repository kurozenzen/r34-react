import { PreferenceKey } from "../data/types";
import TagDataClass from "../data/Tag";
import PostDataClass from "../data/Post";

/////////////////////////////////////////////////////////

export const ADD_TAG = "R34_ADD_TAG";
export const REMOVE_TAG = "R34_REMOVE_TAG";
export const ADD_ALIASES = "R34_ADD_ALIASES";
export const ADD_POSTS = "R34_ADD_POSTS";
export const SET_POSTS = "R34_SET_POSTS";
export const SET_OPTION = "R34_SET_OPTION";
export const GET_RESULTS = "R34_GET_RESULTS";
export const GET_MORE_RESULTS = "R34_GET_MORE_RESULTS";
export const ALLOW_COOKIES = "R34_ALLOW_COOKIES";
export const ENTER_FULLSCREEN = "R34_ENTER_FULLSCREEN";
export const EXIT_FULLSCREEN = "R34_EXIT_FULLSCREEN";
export const SET_FULLSCREEN_POST = "R34_SET_FULLSCREEN_POST";

/////////////////////////////////////////////////////////

interface AddTagAction {
  type: typeof ADD_TAG;
  tag: TagDataClass;
}

interface RemoveTagAction {
  type: typeof REMOVE_TAG;
  tag: TagDataClass;
}

interface AddAliasesAction {
  type: typeof ADD_ALIASES;
  aliases: TagDataClass[];
  forTag: string;
}

interface AddPostsAction {
  type: typeof ADD_POSTS;
  posts: PostDataClass[];
}

interface SetPostsAction {
  type: typeof SET_POSTS;
  posts: PostDataClass[];
  count: string;
  pageNumber?: number;
}

interface SetOptionAction {
  type: typeof SET_OPTION;
  key: PreferenceKey;
  value: any;
}

interface GetResultsAction {
  type: typeof GET_RESULTS;
  pageNumber: number;
}

interface GetMoreResultsAction {
  type: typeof GET_MORE_RESULTS;
}

interface AllowCookiesAction {
  type: typeof ALLOW_COOKIES;
  value: boolean;
}

interface EnterFullcreenAction {
  type: typeof ENTER_FULLSCREEN;
  postId: number;
}

interface SetFullScreenPostAction {
  type: typeof SET_FULLSCREEN_POST;
  postId: number;
}

interface ExitFullscreenAction {
  type: typeof EXIT_FULLSCREEN;
}

/////////////////////////////////////////////////////////

export const addTag = (tag: TagDataClass) => ({
  type: ADD_TAG,
  tag,
});

export const removeTag = (tag: TagDataClass) => ({
  type: REMOVE_TAG,
  tag,
});

export const addAliases = (aliases: TagDataClass[], forTag: string) => ({
  type: ADD_ALIASES,
  aliases,
  forTag,
});

export const addPosts = (posts: PostDataClass[]) => ({
  type: ADD_POSTS,
  posts,
});

export const setPosts = (
  posts: PostDataClass[],
  count: string,
  pageNumber: number = 0
) => ({
  type: SET_POSTS,
  posts,
  count,
  pageNumber,
});

export const setOption = (key: PreferenceKey, value: any) => ({
  type: SET_OPTION,
  key,
  value,
});

export const getResults = (pageNumber: number = 0) => ({
  type: GET_RESULTS,
  pageNumber,
});

export const getMoreResults = () => ({
  type: GET_MORE_RESULTS,
});

export const allowCookiesAction = () => ({
  type: ALLOW_COOKIES,
  value: true,
});

export const enterFullscreen = (postId: number) => ({
  type: ENTER_FULLSCREEN,
  postId,
});

export const exitFullscreen = () => ({
  type: EXIT_FULLSCREEN,
});

export const setFullScreenPost = (postId: number) => ({
  type: SET_FULLSCREEN_POST,
  postId,
});

/////////////////////////////////////////////////////////

export type AppAction =
  | AddTagAction
  | RemoveTagAction
  | AddAliasesAction
  | AddPostsAction
  | SetPostsAction
  | SetOptionAction
  | GetResultsAction
  | GetMoreResultsAction
  | AllowCookiesAction
  | EnterFullcreenAction
  | ExitFullscreenAction
  | SetFullScreenPostAction;
