import produce from 'immer'
import CommentDataClass from '../../data/CommentDataClass'
import PostDataClass from '../../data/PostDataClass'
import { SET_POSTS, ADD_POSTS, SET_COMMENTS, AppAction } from '../actions'

export interface ResultsState {
  posts: PostDataClass[]
  pageNumber: number
  count: number
}

const initialResultsState: ResultsState = {
  posts: [],
  pageNumber: 0,
  count: 0,
}

const addPosts = (state: ResultsState, posts: PostDataClass[]) =>
  produce(state, (draft) => {
    draft.posts = [...state.posts, ...posts]
    draft.pageNumber = state.pageNumber + 1
  })

const setPosts = (state: ResultsState, posts: PostDataClass[], postCount: number, pageNumber: number = 0) =>
  produce(state, (draft) => {
    draft.posts = posts
    draft.count = postCount
    draft.pageNumber = pageNumber
  })

const setComments = (state: ResultsState, postId: number, comments: CommentDataClass[]) =>
  produce(state, (draft) => {
    const postIndex = state.posts.findIndex((p) => p.id === postId)
    if (postIndex >= 0) {
      draft.posts[postIndex].comments = comments
    }
  })

const results = (state: ResultsState = initialResultsState, action: AppAction): ResultsState => {
  switch (action.type) {
    case ADD_POSTS:
      return addPosts(state, action.posts)
    case SET_POSTS:
      return setPosts(state, action.posts, action.count, action.pageNumber)
    case SET_COMMENTS:
      return setComments(state, action.postId, action.comments)
    default:
      return state
  }
}

export default results
