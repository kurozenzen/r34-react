import produce from "immer";
import PostDataClass from "../../data/Post";
import { SET_POSTS, ADD_POSTS, AppAction } from "../actions";

export interface ResultsState {
  posts: PostDataClass[];
  pageNumber: number;
  count: number;
}

export const initialResultsState: ResultsState = {
  posts: [],
  pageNumber: 0,
  count: 0,
};

const addPosts = (state: ResultsState, posts: PostDataClass[]) =>
  produce(state, (draft) => {
    draft.posts = [...state.posts, ...posts];
    draft.pageNumber = state.pageNumber + 1;

    //@ts-expect-error
    window.posts = draft.posts;
  });

const setPosts = (
  state: ResultsState,
  posts: PostDataClass[],
  postCount: string
) =>
  produce(state, (draft) => {
    draft.posts = posts;
    draft.count = Number(postCount);
    draft.pageNumber = 0;

    //@ts-expect-error
    window.posts = draft.posts;
  });

const results = (
  state: ResultsState = initialResultsState,
  action: AppAction
): ResultsState => {
  switch (action.type) {
    case ADD_POSTS:
      return addPosts(state, action.posts);
    case SET_POSTS:
      return setPosts(state, action.posts, action.count);
    default:
      return state;
  }
};

export default results;
