import { useReducer, useEffect } from "react";
import produce from "immer";
import useLocalStorage from "./useLocalStorage";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TAG":
      return addTag(state, action.tag);
    case "REMOVE_TAG":
      return removeTag(state, action.tag);
    case "TOGGLE_TAG":
      return toggleTag(state, action.tag);
    case "ADD_POSTS":
      return addPosts(state, action.posts);
    case "SET_POSTS":
      return setPosts(state, action.posts, action.count);
    case "SET_OPTION":
      return setOption(state, action.key, action.value);
    case "FOCUS_POST":
      return setFocusedPost(state, action.id);
    case "UNFOCUS_POST":
      return setFocusedPost(state, undefined);
    case "SET_ACTIVE_MENU":
      return setActiveMenu(state, action.menu);
    case "RESET":
      return reset(state);
    default:
      throw new Error(`Unrecognized Action: ${action.type}`);
  }
}

function findTag(tags, tagToFind) {
  return tags.findIndex(tag => tag.name === tagToFind.name);
}

const addTag = (state, newTag) =>
  produce(state, draft => {
    const tagIndex = findTag(state.tags, newTag);

    draft.tags = [...state.tags];

    if (tagIndex !== -1) {
      draft.tags[tagIndex] = newTag;
    } else {
      draft.tags = [...draft.tags, newTag];
    }
  });

const removeTag = (state, tagToRemove) =>
  produce(state, draft => {
    const tagIndex = findTag(state.tags, tagToRemove);

    if (tagIndex !== -1) {
      draft.tags = [...state.tags];
      draft.tags.splice(tagIndex, 1);
    }
  });

const toggleTag = (state, tagToToggle) =>
  findTag(state.tags, tagToToggle) !== -1
    ? removeTag(state, tagToToggle)
    : addTag(state, tagToToggle);

const addPosts = (state, posts) =>
  produce(state, draft => {
    draft.results.posts = [...state.results.posts, ...posts];
    draft.results.page = state.results.page + 1;
  });

const setPosts = (state, posts, postCount) =>
  produce(state, draft => {
    draft.results.posts = [...posts];
    draft.results.count = postCount;
    draft.results.page = 0;
  });

const setOption = (state, key, value) =>
  produce(state, draft => {
    draft.options[key] = value;
  });

const setFocusedPost = (state, id) =>
  produce(state, draft => {
    draft.context.focusedPost = id;
  });

const setActiveMenu = (state, menu) =>
  produce(state, draft => {
    draft.context.activeMenu = menu;
  });

const reset = state =>
  produce(state, draft => {
    Object.assign(draft, initialState);
  });

const initialState = {
  results: {
    posts: [],
    page: 0,
    count: undefined
  },
  context: {
    focusedPost: undefined,
    activeMenu: "search"
  },
  tags: [],
  options: {
    infinite: true,
    rated: undefined,
    originals: false
  }
};

/**
 * Creates and manages state
 * @return {[{results: {posts: Array, page: Number, count: Number}, tags: Array, context: {focusedPost: String, activeMenu: String}, options: {originals: Boolean, infinite: Boolean, rated: Boolean}}, dispatch]}
 */
export default function useAppState() {
  const [cache, setCache] = useLocalStorage(initialState);
  const [state, dispatch] = useReducer(reducer, cache);

  useEffect(() => {
    setCache(state);
  }, [setCache, state]);

  return [state, dispatch];
}
