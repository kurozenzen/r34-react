import { MenuType, PreferenceKey } from "../data/types";
import TagDataClass from "../data/Tag";
import PostDataClass from "../data/Post";

/////////////////////////////////////////////////////////

export const RESET = "R34_RESET";
export const SET_ACTIVE_MENU = "R34_SET_ACTIVE_MENU";
export const ADD_TAG = "R34_ADD_TAG";
export const REMOVE_TAG = "R34_REMOVE_TAG";
export const TOGGLE_TAG = "R34_TOGGLE_TAG";
export const ADD_ALIASES = "R34_ADD_ALIASES";
export const ADD_POSTS = "R34_ADD_POSTS";
export const SET_POSTS = "R34_SET_POSTS";
export const SET_OPTION = "R34_SET_OPTION";

/////////////////////////////////////////////////////////

interface ResetAction {
  type: typeof RESET;
}

interface SetActiveMenuAction {
  type: typeof SET_ACTIVE_MENU;
  menu: MenuType;
}

interface AddTagAction {
  type: typeof ADD_TAG;
  tag: TagDataClass;
}

interface RemoveTagAction {
  type: typeof REMOVE_TAG;
  tag: TagDataClass;
}

interface ToggleTagAction {
  type: typeof TOGGLE_TAG;
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
  count: number;
}

interface SetOptionAction {
  type: typeof SET_OPTION;
  key: PreferenceKey;
  value: any;
}

/////////////////////////////////////////////////////////

export const reset = () => ({
  type: RESET,
});

export const setActiveMenu = (menu: MenuType) => ({
  type: SET_ACTIVE_MENU,
  menu,
});

export const addTag = (tag: TagDataClass) => ({
  type: ADD_TAG,
  tag,
});

export const removeTag = (tag: TagDataClass) => ({
  type: REMOVE_TAG,
  tag,
});

export const toggleTag = (tag: TagDataClass) => ({
  type: TOGGLE_TAG,
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

export const setPosts = (posts: PostDataClass[], count: number) => ({
  type: SET_POSTS,
  posts,
  count,
});

export const setOption = (key: PreferenceKey, value: any) => ({
  type: SET_OPTION,
  key,
  value,
});

/////////////////////////////////////////////////////////

export type AppAction =
  | ResetAction
  | SetActiveMenuAction
  | AddTagAction
  | RemoveTagAction
  | ToggleTagAction
  | AddAliasesAction
  | AddPostsAction
  | SetPostsAction
  | SetOptionAction;
