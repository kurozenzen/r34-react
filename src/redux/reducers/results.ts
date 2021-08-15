import produce from 'immer'
import { Comment, Post } from 'r34-types'
import { SET_POSTS, ADD_POSTS, SET_COMMENTS, AppAction } from '../actions'

export interface ResultsState {
  posts: Post[]
  pageNumber: number
  count: number
  updated: number
}

const initialResultsState: ResultsState = {
  posts: [],
  pageNumber: 0,
  count: 0,
  updated: 0,
}

const addPosts = (state: ResultsState, posts: Post[]) =>
  produce(state, (draft) => {
    draft.posts = [...state.posts, ...posts]
    draft.pageNumber = state.pageNumber + 1
    draft.updated = new Date().getTime()
  })

const setPosts = (state: ResultsState, posts: Post[], postCount: number, pageNumber: number = 0) =>
  produce(state, (draft) => {
    draft.posts = posts
    draft.count = postCount
    draft.pageNumber = pageNumber
    draft.updated = new Date().getTime()
  })

const setComments = (state: ResultsState, postId: number, comments: Comment[]) =>
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
